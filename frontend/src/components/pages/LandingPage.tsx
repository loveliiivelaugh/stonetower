import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { ListItem } from '@mui/material';
import {
    LinkedIn as LinkedInIcon,
    Twitter as TwitterIcon,
    YouTube as YouTubeIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import ProductsSection from './Landing/ProductsSection';
// import { useAppStore } from '../../store';
import { Styled } from '../../theme/common';
import pizzaVideoClip from '../../assets/pizza-clip.mp4';


const LandingPage = () => {
    // const appStore = useAppStore();
    const navigate = useNavigate();
    return (
        <Grid container>

            <Grid item sm={12}>
                <Outlet />
            </Grid>

            {/* Big Footer */}
            <Styled.GridSection item sm={12}>
                <Grid container>
                    <Grid item sm={6} sx={{ textAlign: "center", p: 2 }}>
                        <img src='https://picsum.photos/200' alt="logo" style={{ maxHeight: "30vh", borderRadius: "10px" }} />
                        <Box>
                            {[
                                { icon: <TwitterIcon /> },
                                { icon: <FacebookIcon /> },
                                { icon: <InstagramIcon /> },
                                { icon: <LinkedInIcon /> },
                                { icon: <YouTubeIcon /> },
                            ].map((item, index) => (
                                <IconButton 
                                    key={index} 
                                    color="inherit" 
                                    component={motion.button} 
                                    whileHover={{ scale: 1.1 }} 
                                    sx={{ borderRadius: "10px", mt: 2 }}
                                >
                                    {item.icon}
                                </IconButton>
                            ))}
                            <Button 
                                variant="contained" 
                                color="error" 
                                component={motion.button} 
                                whileHover={{ scale: 1.1 }} 
                                sx={{ borderRadius: "10px", mt: 2 }}  
                                onClick={() => navigate("/products/favorites")}
                            >
                                {"Order Now"}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container>
                            <Grid item sm={6}>
                                <Typography variant="h4">
                                    {"Contact Us"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Phone"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Email"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Address"}
                                </Typography>
                                <Toolbar />
                                <Typography variant="h4">
                                    {"About Our Food"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Our Story"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Cooking Directions"}
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography variant="h4">
                                    {"Hours"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Monday - Friday"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Saturday"}
                                </Typography>
                                <Typography variant="body1">
                                    {"Sunday"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Styled.GridSection>

            <Styled.GridSection item sm={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1">
                        {"Copyright © 2024 Stone Tower Pizza"}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <ListItem button>
                            {"Privacy and Data Policy"}
                        </ListItem>
                        <ListItem button>
                            {"Terms and Conditions"}
                        </ListItem>
                    </Box>
                </Box>
            </Styled.GridSection>

        </Grid>
    )
}

export default LandingPage

export const LandingContent = () => {
    const navigate = useNavigate();
    return (
        <>
            <Grid item sm={12}>
                <Box sx={{ maxHeight: "90vh" }}>
                    <video src={pizzaVideoClip} autoPlay loop muted style={{ width: "100%", zIndex: -1 }}></video>
                </Box>
            </Grid>
            <Grid item sm={8} sx={{ zIndex: 1, marginTop: -90, p: 2 }}>
                <Typography variant="h1" gutterBottom>
                    Welcome to Stone Tower <strong>Pizza</strong> |
                </Typography>
                <Divider color="inherit" />
                <Typography variant="h4">
                    Because Pizza is the Best life, the cheesey life that  keeps on cheesing 😄
                </Typography>
                <Button 
                    variant="contained" 
                    color="error" 
                    component={motion.button} 
                    whileHover={{ scale: 1.1 }} 
                    sx={{ borderRadius: "10px", mt: 2 }} 
                    onClick={() => navigate("/products/favorites")}
                >
                    {"Order Now"}
                </Button>
            </Grid>
            <Grid item sm={4}>
                {" "}
            </Grid>

            {/* Menu/Products Overview Section */}
            <ProductsSection filterMap={(key) => (key !== "drinks")} />

            {/* About Us */}
            <Styled.GridSection item sm={12}>
                {[
                    {
                        heading1: "About Us",
                        heading2: "About Us",
                        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                        cta: "Learn More",
                        order1: 1,
                        order2: 2
                    },
                    {
                        heading1: "About Us",
                        heading2: "About Us",
                        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                        cta: "Learn More",
                        order1: 2,
                        order2: 1
                    }
                ].map(section => (
                    <Grid container sx={{ maxHeight: "100vh" }}>
                        <Grid item sm={4} order={section.order1} sx={{ textAlign: "center", verticalAlign: "middle", p: 2, mt: 20 }}>
                            <Typography variant="h4">
                                {section.heading1}
                            </Typography>
                            <Typography variant="h3">
                                {section.heading2}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {section.body}
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="error" 
                                component={motion.button} 
                                whileHover={{ scale: 1.1 }} 
                                sx={{ borderRadius: "10px", mt: 2 }}
                                onClick={() => navigate("/about")}
                            >
                                {section.cta}
                            </Button>
                        </Grid>
                        <Grid item sm={8} order={section.order2} sx={{ textAlign: "center", verticalAlign: "middle", p: 2, mt: 10 }}>
                            <Box 
                                component={motion.div} 
                                sx={{ border: "2px solid #a33", borderRadius: "10px" }} 
                                whileHover={{ scale: 1 }}  
                            >
                                <img src={"https://picsum.photos/200"} alt="about us" style={{ width: "100%", maxHeight: "70vh", borderRadius: "10px" }} />
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Styled.GridSection>
        </>
    )
}