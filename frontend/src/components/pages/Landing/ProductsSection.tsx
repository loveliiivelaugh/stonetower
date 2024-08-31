import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CardActionArea, CardContent } from "@mui/material";
import { motion } from "framer-motion";

import { queries } from "../../../api";
import { useAppStore } from "../../../store";
import Image from "../../Image";


// Types
interface ProductsSectionProps {
    header?: boolean
    filterMap?: (key: string) => boolean
};

interface ProductProps {
    id: number
    name: string
    recipe: string
    image: string
    category: string
    price: number
    description: string
    available: boolean
    imageName?: string[]
};

// Render
const ProductsSection = ({ 
    header = true, 
    filterMap = () => true
}: ProductsSectionProps) => {

    const productsQuery = useQuery(queries.query("/stripe/products"));
    const appStore = useAppStore();
    const navigate = useNavigate();
    const params = useParams();
    console.log("ProductsSection: ", params);

    const isPos = ((window.location.pathname === "/pos") || params?.category);

    const handleProductClick = (product: ProductProps) => {

        appStore.setSelectedProduct(product); // TODO: update this to use router and params passing the product id
        navigate((isPos ? "/pos" : "") + "/product/" + product.id);
    };

    return ({
        pending: <></>,
        loading: <></>,
        error: <></>,
        success: (
        <Grid item sm={12} sx={{ bgcolor: "rgba(33, 33, 33, 0.9)", backdropFilter: "blur(5px)", borderTop: "4px solid #a33", borderBottom: "4px solid #a33", p: 2 }}>
            {header && (
                <Box>
                    <Typography variant="h4">
                        Feast Your Eyes
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h2">
                            Then Your Stomach
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={() => navigate("/menu")}
                            component={motion.button} 
                            whileHover={{ scale: 1.1 }} 
                            sx={{ borderRadius: "10px" }}
                        >
                            View Full Menu
                        </Button>
                    </Box>
                    <Typography variant="body1">
                        We don’t have an answer to what’s for dinner, we have a whole menu. There’s something for every appetite here.
                    </Typography>
                </Box>
            )}
            {productsQuery.data && Object
                .keys(productsQuery.data)
                .map((key: string) => filterMap(key) && (
                    <Grid container sx={{ textAlign: "center" }}>
                        {productsQuery.data[key as keyof typeof productsQuery.data]
                            .map((item: ProductProps) => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} p={2}>
                                    <Image item={item} handleClick={() => handleProductClick(item)} />
                                    {isPos ? (
                                        <>
                                            <CardContent>
                                                <Typography variant="h6" component="h6">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body1" component="p">
                                                    {`$${item.price}` || "$0.00"}
                                                </Typography>
                                                <Typography variant="subtitle1" component="p">
                                                    {item.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActionArea sx={{ p: 2, textAlign: "right" }}>
                                                <Button color="inherit" variant="outlined" onClick={() => appStore.addItem(item)}>
                                                    Add To Cart
                                                </Button>
                                            </CardActionArea>
                                        </>
                                    ) : (
                                        <Typography variant="h6">
                                            {item.name}
                                        </Typography>
                                    )}
                                </Grid>
                            ))
                        }
                    </Grid>
            ))}
        </Grid>
        )
    }[productsQuery.status])
};

export default ProductsSection;
