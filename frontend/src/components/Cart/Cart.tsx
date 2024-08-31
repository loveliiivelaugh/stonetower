import { useNavigate } from 'react-router-dom';
import {
    Badge, Box, Button, Chip, Drawer, 
    IconButton, 
    List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, 
    Typography 
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

import Image from '../Image';
import { useAppStore } from '../../store';
import { appScripts } from '../../utilities/appScripts';
import { client, paths } from '../../api';


const Cart = () => {
    const appStore = useAppStore();
    const navigate = useNavigate();

    const isPos = (window.location.pathname.includes("/pos"));

    const handleCheckout = async () => {
        // Todo: Send any unsent orders
        // ...
        console.log("handleCheckout: ", appStore.selectedTable);

        // TODO: Clean this up ...
        // ... if /pos system app then use this logic that gathers all orders ...
        // ... from given table
        // ... Can move this logic to the backend
        if (appStore.selectedTable) {
            // Get all the current table data
            const tableResponse = (await client.get(paths.tables + "?table=" + appStore.selectedTable)).data
                .find(({ table_number }: { table_number: number }) => (table_number === parseInt(appStore.selectedTable as string)));
            
            console.log("handleCheckout: ", tableResponse);
            // Get all the orders from the tables order history
            const ordersResponse = await Promise.all(
                (tableResponse?.order_history || [])
                    .map((orderId: string) => client.get(paths.orders + "?id=" + orderId))
            );

            appStore.setState({
                // Set the check data ...
                check: {
                    table: appStore.selectedTable,
                    ...tableResponse,
                    orders: (ordersResponse || []),
                    total: appStore.getTotal(appStore.items)
                },
                // ... Navigate to checkout
                activeView: "checkout",
                // ... Close the cart
                drawerOpen: false
            });
            navigate("/pos/checkout");
        }

        else {
            appStore.setState({
                check: {
                    table: "carryout",
                    type: "carryout",
                    orders: [appStore.items],
                    total: appStore.getTotal(appStore.items)
                },
                activeView: "checkout",
                drawerOpen: false
            });
            navigate("/customer/checkout");
        }
    };

    return (
        <Drawer
            anchor="right"
            open={appStore.drawerOpen}
            onClose={() => appStore.setDrawerOpen(false)}
        >
            <Box sx={{ p: 2, width: 300, mt: 8 }}>
                <Typography>
                    Shopping Cart
                </Typography>

                {/* Shopping Cart Items */}
                <List>
                    {appStore.items.map(item => (
                        <ListItem key={item.id}>
                            <Badge badgeContent={item.quantity || 1} color="primary">
                                <ListItemAvatar sx={{ px: 1 }}>
                                    <Image item={item} sx={{ width: "64px" }} />
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={<Chip label={`$${item.price}`} size="small"/>} />
                            </Badge>
                            <ListItemIcon>
                                <IconButton color="error" size="small" component={motion.button} whileHover={{ scale: 1.2 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
                {/* Total *** TODO: Clean up methods */}
                <Box sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1">
                        Subtotal: ${appStore.getTotal(appStore.items)}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Tax: ${appStore.getTax(appStore.getTotal(appStore.items))}
                    </Typography>
                    <Typography variant="body1">
                        Total: ${appStore.getTotal(appStore.items) + appStore.getTax(appStore.getTotal(appStore.items))}
                    </Typography>
                </Box>

                {/* Checkout Button */}
                <Box sx={{ width: "100%", display: "flex", gap: 2, mt: 4, justifyContent: "center" }}>
                    <Button variant="outlined" color="error">
                        Clear Cart
                    </Button>
                    <Button variant="contained" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    {isPos && (
                        <Button onClick={() => appScripts.handleSendOrder(appStore)}>
                            Send
                        </Button>
                    )}
                </Box>

            </Box>
        </Drawer>
    )
}

export default Cart