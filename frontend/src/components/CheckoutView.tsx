// Packages
// import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import { confetti } from "@tsparticles/confetti";

// Utilities
import { useAppStore } from "../store"
import { paths, queries } from "../api";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// Components
const CheckoutView = () => {
    const { check, setActiveView } = useAppStore();
    
    return (
        <Grid container>
            <Grid item sm={6}>
                <CheckoutFormWrapper />
            </Grid>
            <Grid item sm={6} p={2}>
                <Button variant="outlined" color="inherit" onClick={() => setActiveView("order")}>
                    <ArrowLeft />
                    Return to Table
                </Button>
                <Toolbar /> 
                <Typography variant="h4">Order Details</Typography>
                <List dense>
                    {Object
                        .keys(check)
                        .map((key: string) => ["string", "number"]
                            .includes(typeof(check[key as keyof typeof check])) && (
                                <ListItem key={key}>
                                    <ListItemText primary={`${key}: ${check[key as keyof typeof check]}`} />
                                </ListItem>
                            ))
                    }
                </List>
            </Grid>
        </Grid>
    );
};

export default CheckoutView;

const CheckoutFormWrapper = () => {
    const { check } = useAppStore();
    const checkoutSessionQuery = useQuery(queries.query(paths.createCheckout, check));
    return ({
        pending: <></>,
        loading: <></>,
        error: <>Problem retrieving checkout session</>,
        success: <CheckoutForm clientSecret={checkoutSessionQuery.data?.clientSecret || null} />,
    }[checkoutSessionQuery.status] || <CheckoutForm />);
};

const CheckoutForm = ({ clientSecret = null }: { clientSecret?: string | null }) => {
    return (
        <Grid container>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </Grid>
    );
};

export const Return = () => {
    const appStore = useAppStore();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    // const { session_id } = useParams();
    
    const queryPath = (paths.getCheckoutStatus + `?session_id=${sessionId}`);
    const sessionStatusQuery = useQuery(queries.query(queryPath));

    if (sessionStatusQuery.data?.status === "complete") confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        zIndex: 9999
    });
    
    console.log({ sessionStatusQuery, appStore });
    return ({
        pending: <></>,
        loading: <></>,
        error: <>Problem retrieving checkout session status</>,
        success: (sessionStatusQuery.data?.status === "complete") 
            ? (
                <Grid container id="success" sx={{ marginTop: 8, p: 2 }} rowSpacing={2}>
                    <Grid item sm={12}>
                        <Typography variant="body1">
                            A Copy of your order.
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1">
                            Your order is cooking in the kitchen and will be ready shortly.
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1">
                            We appreciate your business! A confirmation email will be sent to {sessionStatusQuery.data.customer_email}.

                            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                        </Typography>
                    </Grid>
                    <Grid item sm={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button variant="contained" color="error" sx={{ m: 2 }}>
                            Get Text Updates
                        </Button>
                    </Grid>
                </Grid>
            ) : <></>,
    }[sessionStatusQuery.status] || <></>);
};

// {({
//     open: <></>,
//     complete: (
        // <Grid container id="success" sx={{ marginTop: "100vh" }}>
        //     <p>
        //         We appreciate your business! A confirmation email will be sent to {sessionStatusQuery.data.customerEmail}.

        //         If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        //     </p>
        // </Grid>
//     ),
//     expired: <>Expired</>,
// }[sessionStatusQuery.data.status as any] || <>)}