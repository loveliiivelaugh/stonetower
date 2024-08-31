import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { BottomNavigation, BottomNavigationAction, Tabs } from '@mui/material';

import ProductsSection from "../pages/Landing/ProductsSection";
import { useAppStore } from "../../store";


const topics = ["Drinks", "Apps", "Pizza", "Desserts"];
const lastOrderedText = `Last Ordered:\n\nDrinks:\n\nApps:\n\nPizza:\n\nDesserts:`;
const categoryMap = {
    favorites: "favorites",
    pizza: "pizzas",
    apps: "appetizers",
    drinks: "drinks",
    desserts: "desserts"
};

const OrderView = () => {
    const appStore = useAppStore();
    return (
        <Grid container mt={10}>

            {/* Order View Header */}
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h4" px={2}>
                        Table {appStore.selectedTable}
                    </Typography>
                    <Typography variant="h5" px={2} gutterBottom>
                        {appStore.activeCategory.slice(0, 1).toUpperCase() + appStore.activeCategory.slice(1)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" px={2}>
                        Time table opened: 12:34 PM
                    </Typography>
                    <Typography variant="body1" px={2}>
                        Time table sat: 00:47
                    </Typography>
                    <Tooltip title={<Typography>{lastOrderedText}</Typography>}>
                        <Typography variant="body1" px={2} sx={{ "&:hover": { cursor: "pointer" } }}>
                            Last Ordered
                        </Typography>
                    </Tooltip>
                </Box>
            </Grid>

            {/* Products */}
            <ProductsSection 
                header={false} 
                filterMap={(key) => (key === categoryMap[appStore.activeCategory as keyof typeof categoryMap])} 
            />

            {/* Bottom Navigation */}
            <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "100vw", overflow: "auto" }}>
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
                            onClick={() => appStore.setActiveCategory(item.toLowerCase())}
                        />
                    ))}
                </BottomNavigation>
            </Box>

        </Grid>
    )
}

export default OrderView