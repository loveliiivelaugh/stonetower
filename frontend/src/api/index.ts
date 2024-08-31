import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5001/api/v1",
    headers: {},
});

export const openServerClient = axios.create({
    baseURL: "http://localhost:5052/api/v1/stability",
    headers: {}
})

// Paths are defined globally to support maintainability
const paths = {
    // Could probably break down the 6 table routes into 1 catchall database route
    "schema": "/schema",
    "signin": "/signin",
    "staff": "/staff",
    "inventory": "/inventory",
    "tables": "/tables",
    "orders": "/orders",
    "getImage": "/inventory/image/", // + imageName
    "createCheckout": "/stripe/create-checkout-session",
    "getCheckoutStatus": "/stripe/session-status",
    "database": "/database",
};

// general app queries
const queries = ({
    // General Query to use any query with a passed queryPath
    query: (queryPath: string, payload?: any, method?: string) => ({
        queryKey: [queryPath],
        queryFn: async () => payload 
            ? (await (client as any)[method || "post"](queryPath, payload)).data
            : (await (client as any)[method || "get"](queryPath)).data
    })
});

export { client, paths, queries };
