import { Hono } from "hono";
import { Context } from "hono";
import { validator } from "hono/validator";
import { ordersScripts } from "./ordersRoutes";

// import menuItems from "../../data/menu2.json"
const menuItems = require('../../data/menu2.json');

// This is your test secret API key.
const stripe = require('stripe')(Bun.env.STRIPE_SECRET_KEY);

const stripeRoutes = new Hono();

const YOUR_DOMAIN = 'http://localhost:5173';

stripeRoutes.post('/create-checkout-session', 
    // Validate POST request's
    validator('json', (value: any, c: Context) => {

        return value;
    }),
    async (c: Context) => {
        const payload = await c.req.valid("json");
        console.log("/create-checkout-session1: ", payload);
        const allLineItems = Object.assign(
            {},
            ...(payload as any).orders
                .map((order: any[]) => order
                    .map(({ stripe }: { stripe: { default_price: string } }) => ({
                        price: stripe.default_price, 
                        quantity: 1
                    }))
                )
        );

        console.log("/create-checkout-session2: ", allLineItems);

        try {
            const session = await stripe.checkout.sessions.create({
                ui_mode: 'embedded',
                line_items: allLineItems,
                // [
                //     {
                //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                //         price: 'price_1NfpzoKcveQQCaXH2RVHjenX',
                //         quantity: 1,
                //     },
                // ],
                mode: 'payment',
                return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
            });
        
            return c.json({ clientSecret: session.client_secret });
            
        } catch (error: any) {

            return c.text(error.message, 500);
        }
    });

stripeRoutes.get('/session-status', async (c: Context) => {
    const session = await stripe.checkout.sessions.retrieve(c.req.query("session_id"));

    console.log("/session-status: ", session);
    if (session.status === "complete") {
        // Determine if order is carryout or delivery
        // Send the order to the kitchen
        let orderType = ("carryout" || "delivery");
        const sentOrderResponse = await ordersScripts[orderType as keyof typeof ordersScripts](session);

        console.log({ sentOrderResponse });
    };

    return c.json({
        status: session.status,
        customer_email: session.customer_details.email
    });
});

stripeRoutes.post('/product', validator('json', (value: any, c: Context) => {
    // Validations on the server side for POST requests

    // const parsed = (validationMap[table as keyof typeof validationMap] as any)
    //     .safeParse(formattedValues);

    // if (!parsed.success) return c.text('Invalid!', 401);

    // return parsed.data;

    return value;

}),
async (c: Context) => {
    type Product = {
        name: string
        id?: string // default Stripe will auto-assign
        active?: boolean // defaults to true
        description?: string
        metadata?: any
        default_price_data: {
            currency: string
            currency_options?: {},
            recurring?: {},
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified'
            unit_amount: number
            unit_amount_decimal?: number
        }
        images: string[]
        // ... refer to https://docs.stripe.com/api/products/create for full list of properties
        url?: string // A URL of a publicly-accessible webpage for this product.
    }
    const payload: Product = await c.req.valid("json");
    console.log("creating stripe product: ", payload);
    try {

        const product = await stripe.products.create(payload);

        return c.json(product);
    } catch (error: any) {
        console.error(error);
        
        return c.text(error.message, 500);
    }
})
.get('/products', async (c: Context) => {
    const { database } = c.var;
    // const now = new Date();
    // const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    try {
        const stripeProducts = (await stripe.products.list({ 
            limit: 100
            // created: {
            //     gte: oneDayAgo.toJSON(),
            //     lte: now.toJSON()
            // }
        })).data;
        // const databaseProducts = await database
        //     .query
        //     .products
        //     .findMany();

        const combinedProducts = menuItems.map((item: any) => {
            const product = stripeProducts.find((p: any) => (p.name === item.name));
            return { ...item, stripe: product };
        });

        const productsByCategory = combinedProducts.reduce((acc: any, item: any) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        
        return c.json(productsByCategory);

    } catch (error: any) {
        console.error("Error fetching products: ", error);

        return c.text(error.message, 500);
    }
});

export { stripeRoutes }