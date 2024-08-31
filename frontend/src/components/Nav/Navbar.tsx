import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindowSize } from 'usehooks-ts';
import { 
    Alert, AlertTitle,Drawer,
    AppBar, Badge, Button, Box, Icon, IconButton, 
    List, ListItem, ListItemText, Toolbar, Tooltip, Typography,
    ListItemButton
} from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SignOutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import Cart from "../Cart/Cart";
import { useAppStore } from '../../store';
import stoneTowerLogo from '../../assets/stone-tower.svg';


const Navbar = () => {
    const appStore = useAppStore();
    const navigate = useNavigate();
    const location = useLocation();

    const windowSize = useWindowSize();
    let shouldCollapse = (windowSize.width < 940);

    const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);

    let isPos = (location.pathname === "/pos");
    let isCustomerPos = (location.pathname.includes("/products"));

    const handleSignout = () => {
        appStore.setState({
            activeView: "signin", // Update view
            selectedTable: null, // clear the table
            activeCategory: "drinks", // Reset default category
            items: [], // clear the cart
            drawerOpen: false // close the drawer
        });
    };

    const handleClose = (newView?: string) => {
        // console.log("handleClose: ", newView)
        if (newView === "landing") navigate("/");
        else if (newView) appStore.setActiveView(newView);
        setMenuOpen(false);
    };

    const handleTopDrawerClick = (navigateTo: string) => {
        setIsTopDrawerOpen(false);
        navigate(navigateTo);
    };

    const MenuProps: {
        anchorEl: any;
        id: string;
        keepMounted: boolean;
        open: boolean;
        onClose: () => void;
        anchorOrigin: any;
        transformOrigin: any;
    } = {
        anchorEl: menuRef.current,
        id: 'menu-appbar',
        keepMounted: true,
        open: menuOpen,
        onClose: () => handleClose(),
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "right",
        },
    };

    return (
        <AppBar sx={theme => ({ zIndex: theme.zIndex.drawer + 1, bgcolor: theme.palette.primary.main })}>
            
            <Alert severity="warning">
                <AlertTitle>WARNING CONCEPT ONLY</AlertTitle>
            </Alert>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, "&:hover": { cursor: "pointer" } }} onClick={() => handleTopDrawerClick("/") }>
                    <Icon>
                        <img src={stoneTowerLogo} className="stone tower logo" alt="Stone Tower logo" />
                    </Icon>
                    <Typography variant="body1" component="p">
                        Stone Tower Pizza
                    </Typography>
                </Box>

                {shouldCollapse ? (
                    <Box>
                        <IconButton>
                            <MenuIcon onClick={() => {
                                if (appStore.drawerOpen && !isTopDrawerOpen) appStore.setDrawerOpen(false);
                                setIsTopDrawerOpen(prev => !prev)
                            }} />
                        </IconButton>
                        <Drawer
                            anchor={"top"}
                            open={isTopDrawerOpen}
                            onClose={() => setIsTopDrawerOpen(false)}
                        >
                            <Box 
                                sx={{ 
                                    width: "100%", 
                                    height: "auto",
                                    marginTop: "118px",
                                    flexShrink: 0,
                                    [`& .MuiDrawer-paper`]: { 
                                        width: '100%', 
                                        boxSizing: 'border-box' 
                                    },
                                    textAlign: "right"
                                }}
                            >
                                {(!isPos && !isCustomerPos) ? (
                                    <List sx={{ textAlign: "right" }}>
                                        {["Menu", "Locations", "Rewards", "Careers", "About"].map((option, index) => (
                                            <ListItemButton key={index} onClick={() => handleTopDrawerClick(`/${option.toLowerCase()}`)} sx={{ textAlign: "center"}}>
                                                <ListItemText primary={option} />
                                            </ListItemButton>
                                        ))}
                                        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                                            <Button variant="contained" color="error" sx={{ borderRadius: "10px" }} onClick={() => handleTopDrawerClick("/products/favorites")}>
                                                Order Now
                                            </Button>
                                        </ListItem>
                                    </List>
                                ) : (
                                    <List sx={{ textAlign: "right" }}>
                                        {["Tables", "Orders", "Admin", "Landing"].map((option, index) => (
                                            <ListItemButton key={index} onClick={() => {
                                                setIsTopDrawerOpen(false);
                                                handleClose(option.toLowerCase());
                                            }} sx={{ textAlign: "center"}}>
                                                <ListItemText primary={option} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </Drawer>

                        <Tooltip title="Shopping Cart">
                            <Badge badgeContent={appStore.items.length}>
                                <IconButton color="inherit" onClick={() => {
                                    setIsTopDrawerOpen(false);
                                    appStore.setDrawerOpen(true);
                                }}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Badge>
                        </Tooltip>
                    </Box>
                ) : (!isPos && !isCustomerPos) ? (
                    <Box sx={{ }}>
                        <List sx={{ display: "flex", gap: 2 }}>
                            {["Menu", "Locations", "Rewards", "Careers", "About"].map((option, index) => (
                                <ListItem key={index} button onClick={() => navigate(`/${option.toLowerCase()}`)}>
                                    <ListItemText primary={option} />
                                </ListItem>
                            ))}
                            <ListItem>
                                |
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" color="error" sx={{ borderRadius: "10px" }} onClick={() => navigate("/products/favorites")}>
                                    Order Now
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                ) : (
                    <Box>
                        <Tooltip title="Shopping Cart">
                            <Badge badgeContent={appStore.items.length}>
                                <IconButton color="inherit" onClick={() => appStore.setDrawerOpen(true)}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Badge>
                        </Tooltip>

                        {!isCustomerPos && (
                            <>
                                <Tooltip title="Menu">
                                    <IconButton
                                        ref={menuRef}
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        color="inherit"
                                    >
                                        <ArrowOutwardIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu {...MenuProps}>
                                    {["Tables", "Orders", "Admin", "Landing"].map((option, index) => (
                                        <MenuItem key={index} onClick={() => handleClose(option.toLowerCase())}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <Tooltip title="Sign Out">
                                    <IconButton color="inherit" onClick={handleSignout}>
                                        <SignOutIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Box>
                )}
            </Toolbar>
            {/* Shopping Cart */}
            <Cart />

        </AppBar>
    )
}

export default Navbar