import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "../App";
import Navbar from "../components/Nav/Navbar";
import LandingPage from "../components/pages/LandingPage";
import MenuPage from "../components/pages/MenuPage";
import ProductSection from "../components/pages/ProductSection";
import { LandingContent } from "../components/pages/LandingPage";
import { PageTransitionWrapper } from "../theme/ThemeProvider";

import Mapbox from "../components/Map/Map";
import { Toolbar } from "@mui/material";
import CheckoutView, { Return } from "../components/CheckoutView";

interface RouteType {
    path: string
    element: JSX.Element
    children?: RouteType[]
}

const landingRoutes = [
    {
        path: "/",
        element: (<LandingContent />),
    },
    {
        path: "/return",
        element: (<Return />),
    },
    {
        path: "/menu",
        element: (<MenuPage />),
    },
    {
        path: "/locations",
        element: (<Mapbox />), // Using Mapbox technology
    },
    {
        path: "/rewards", // Using Email signup flow
        element: (<>Rewards</>),
    },
    {
        path: "/careers", // coming soon
        element: (<>Work With Us</>),
    },
    {
        path: "/about",
        element: (<>About</>),
    },
    {
        path: "/products/:category",
        element: (<MenuPage />),
    },
    {
        path: "/product/:id",
        element: (<ProductSection />),
    },
].map((route: RouteType) => ({ 
    ...route, 
    element: (
        <PageTransitionWrapper>
            {route.element}
        </PageTransitionWrapper>
    )
}));

export function LandingPageOutlet({ children }: { children: JSX.Element }) { // Landing Page Outlet (JSX) {
    return (
        <>
            <Navbar />
            <Toolbar />
            {children}
        </>
    );
};

const appRoutes = [
    {
        path: "/",
        element: (<LandingPage />),
        children: landingRoutes
    },
    {
        path: "/pos",
        element: (<App />),
    },
    {
        path: "/pos/product/:id",
        element: (<ProductSection />),
    },
    {
        path: "/pos/checkout",
        element: (<CheckoutView />),
    },
    {
        path: "/customer/checkout",
        element: (<CheckoutView />),
    },
].map((route: RouteType) => ({ 
    ...route, 
    element: (
        <LandingPageOutlet 
            children={<PageTransitionWrapper>{route.element}</PageTransitionWrapper>} 
        />
    )
}));

const appRouter = createBrowserRouter(appRoutes);

export function AppRouter() {
    return (
        <RouterProvider router={appRouter} />
    )
};