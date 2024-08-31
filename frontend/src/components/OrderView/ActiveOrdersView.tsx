import { useState } from "react";
import { Card, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { BottomNavigation, BottomNavigationAction, Tabs } from "@mui/material"
import { useQuery } from "@tanstack/react-query";

import { Styled } from "../../theme/common";
import { client, paths, queries } from "../../api";


// const orderTypes = ["Pickup", "Delivery", "Dine-in"];
const topics = ["All", "Bar", "Kitchen", "Pantry"];
const categories = ["drinks", "appetizers", "pizzas", "desserts"];

const tabDefinitions = {
    "All": categories,
    "Bar": ["drinks"],
    "Kitchen": ["appetizers", "pizzas"],
    "Pantry": ["desserts"]
};

// Types
interface ItemType {
    "id": number,
    "name"?: string,
    "image"?: string,
    "price"?: number,
    "recipe"?: string,
    "category"?: string,
    "description"?: string
};

interface OrderType {
    "id": string,
    "type": string,
    "employee_id": string,
    "table_number": number,
    "items": ItemType[],
    "completed"?: boolean,
    "completed_at"?: string
};

const ActiveOrdersView = () => {
    const ordersQuery = useQuery(queries.query(paths.orders + "?completed=false"));
    // console.log("ActiveOrdersView: ", ordersQuery);

    const [activeTab, setActiveTab] = useState("All");

    const completeOrder = async (order: OrderType) => {
        // TODO:  Update to mutation -- to get dynamic status
        const response = await client.get(paths.orders + "/complete?id=" + order.id);

        if (response.status === 200) await ordersQuery.refetch();
    };

    return (
        <Grid container mt={10}>
            <Grid item xs={12} px={2}>
                <Typography variant="h5">
                    {activeTab === "All" ? activeTab : ""} Active {activeTab !== "All" ? activeTab : ""} Orders
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} p={2}>
                    {ordersQuery.data
                        ?.filter((order: OrderType) => order.items
                            .map(({ category }) => category)
                            .some((category) => tabDefinitions[activeTab as keyof typeof tabDefinitions].includes(category as string)) 
                            || (activeTab === "All")
                        )
                        ?.map((order: OrderType) => !order.completed && (
                            <Grid item md={3} key={order.id}>
                                <Card elevation={4} sx={{ width: "100%", p: 2 }} onDoubleClick={() => completeOrder(order)}>
                                    <Typography key={order.id}>{order.id}</Typography>
                                    <List dense>
                                        {Object
                                            .keys(order)
                                            .map((key: string) => ["string", "number"].includes(typeof(order[key as keyof typeof order])) && (
                                                <ListItem key={key}>
                                                    <ListItemText primary={`${key}: ${order[key as keyof typeof order]}`} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    <Typography variant="h6">Order</Typography>
                                    <Divider />
                                    {order.items.map((item: ItemType, index: number) => (
                                        <ListItemText key={item.id} primary={item.name} secondary={"Seat: " + (index + 1)} />
                                    ))}
                                </Card>
                            </Grid>
                    ))}
                </Grid>
            </Grid>
            <Styled.BottomNavWrapper>
                <BottomNavigation
                    component={Tabs}
                    showLabels
                    variant="scrollable"
                    scrollButtons="auto"
                    value={0}
                    sx={{ zIndex: 1000, pt: 2 }}
                >
                    {topics.map((item: string, index: number) => (
                        <BottomNavigationAction
                            key={index} 
                            label={item} 
                            icon={(topics as any)[item]}
                            onClick={() => setActiveTab(item)}
                        />
                    ))}
                </BottomNavigation>
            </Styled.BottomNavWrapper>
        </Grid>
    )
}

export default ActiveOrdersView