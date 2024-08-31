import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';

import { useAppStore } from '../../store';
import Image from '../Image';


const ProductSection = () => {
    const appStore = useAppStore();
    const navigate = useNavigate();
    // const params = useParams();
    const location = useLocation();
    console.log("ProductSection: ", location)
    const isPos = (location.pathname.includes("/pos"));
    
    const product = appStore.selectedProduct;
    // const product = Object.assign(
    //     {}, 
    //     ...Object
    //         .keys(items)
    //         .map((key: string) => items[key as keyof typeof items])
    //         .flat()
    //         .find((item: any) => (item.id === params.id))
    // );

    // console.log("ProductSection: ", product)

    const handleAddToCart = (product: any) => {
        appStore.addItem(product);
        navigate('/products/' + product.category);
    }

    const handleBackToMenu = () => {
        appStore.setSelectedProduct(null);
        if (isPos) appStore.setActiveView("order")
        else navigate("/menu");
    };

    return (
        <Grid container mt={12} p={2}>
            <Grid item xs={12}>
                <Typography variant="h3" gutterBottom>
                    {product?.category}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {product?.name}
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Image item={product} handleClick={() => {}} />
            </Grid>
            <Grid item md={6}>
                <List dense>
                    {Object
                        .keys(product as any)
                        .map((key: string) => (
                            ["string", "number"]
                                .includes(typeof((product as any)[key as keyof typeof product])) 
                            && (key !== "image")
                        ) && (
                            <ListItem key={key}>
                                <ListItemText primary={`${(product as any)[key as keyof typeof product]}`} />
                            </ListItem>
                        ))
                    }
                </List>
                <Box sx={{ justifyContent: "flex-end", p: 2, display: "flex", gap: 2 }}>
                    <Button variant="outlined" color="inherit" sx={{ borderRadius: "10px"}} onClick={handleBackToMenu}>
                        {isPos ? "Back to Order" : "Back to Menu"}
                    </Button>
                    <Button variant="contained" color="error" sx={{ borderRadius: "10px"}} onClick={() => handleAddToCart(product)}>
                        Add to Cart
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProductSection