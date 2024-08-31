import { Hono } from 'hono'
import { Context } from 'hono';
import { validator } from 'hono/validator';
import { eq } from 'drizzle-orm';

import * as schema from '../../database/schemas';


export const ordersScripts = {
    dine: async (order: any) => {
        const { database, orderResult } = order;

        // Get the table data w/ the table number
        // TODO: need to update this via table id
        const [ tableData ] = await database
            .select()
            .from(schema.tables)
            .where(eq(schema.tables.table_number, order.table_number));

        console.log("tableData: ", tableData, orderResult);
        const prevOrderHistory = tableData.order_history;
        const updatedOrderHistory = [
            ...prevOrderHistory 
                ? prevOrderHistory 
                : [], 
            { order_id: orderResult.id }
        ];

        const tableNumber = parseInt(order.table_number);
        console.log("updatedOrderHistory: ", updatedOrderHistory, tableNumber);
        // !!! TODO: update the order_history column in the tables table
        // ??? Needed to track full tables checkout
        // add the resulting order_id to the order_history column in the tables table
        
        try {
            const [ result2 ] = await database
                .update(schema.tables)
                .set({ order_history: updatedOrderHistory })
                .where(eq(schema.tables.table_number, order.table_number))
                .returning();

            console.log("result2: ", result2);
            // // send the order
            // ordersScripts.sendOrder(order);

            return result2;

        } catch (error: any) {
            console.error("Error adding order to table order history: ", error.message);

            return { error: error.message };
        }

    },
    carryout: async (order: any) => {
        // send the order
        console.log("carryout: ", order);

        return ({ ...order, sentStatus: "success" });
    },
    delivery: async (order: any) => {
      // send the order
    },

    sendOrder: async (order: any) => {
      // send the order
    }
};

const ordersRoutes = new Hono();

ordersRoutes
    // /api/v1/orders GET -- repetitve for each table type
    // ... move to reuseable function
    .get('/', async (c: Context) => {
        const { database } = c.var;
        
        try {
            const result = await database
                .query
                .orders
                .findMany();

            return c.json(result);

        } catch (error: any) {
            console.error("Error fetching tables: ", error);

            return c.text(error.message, 500);
        }
    })
    .post('/', validator('json', (value: any, c: Context) => {
        // Validations on the server side for POST requests
        return value;

    }),
    async (c: Context) => {
        const order = await c.req.valid("json" as "json");
        const { database } = c.var;

        if (!order) return c.text('Invalid!', 401);

        const total = (order as any).items
            .reduce((acc: any, item: any) => (acc + item.price), 0) || 0;

        const values = {
            ...(order as any),
            total
        };

        console.log("/api/v1/orders: ", values);
    
        try {
            // add the order to the orders table
            const [ result ] = await database
                .insert(schema.orders)
                .values(values)
                .returning();

            console.log("result: ", result);
    
            const wrappedOrder = {
                ...(order as any),
                database,
                orderResult: result
            };
    
            // Call the correct script based on order type
            const response = await ordersScripts[(order as any).type as keyof typeof ordersScripts](wrappedOrder);
    
            // TODO: should happen for all order types
            // ?? Kitchen has to make the order regardless of type
            // Seperate the items in the order by category to route open product items to ...
            // ... appropriate areas of restaurants BOH, ie. kitchen, pantry, bar, etc.
            const itemsByCategory = (order as any).items
                .reduce((acc: any, item: any) => {
    
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    };
        
                    acc[item.category].push(item);
        
                    return acc;
        
                }, {});
    
            Object.keys(itemsByCategory).forEach((key: string) => {
    
                itemsByCategory[key].forEach((item: any) => {
                    // console.log("key: " + key, "item: ", item);
                });
            })
    
            console.log(itemsByCategory, response);
    
            return c.json({ order, itemsByCategory, response }, 200);
            
        } catch (error: any) {
            console.error("Error sending order: ", error.message);
    
            return c.text(error.message, 500);
        }
    })
    // TODO: Make this route just to bump orders
    .get('/complete', validator('json', (value: any, c: Context) => {
        // Validations on the server side for POST requests

        // const parsed = (validationMap[table as keyof typeof validationMap] as any)
        //     .safeParse(formattedValues);

        // if (!parsed.success) return c.text('Invalid!', 401);

        // return parsed.data;

        return value;

    }),
    async (c: Context) => {
        const id = c.req.query("id");
        const { database } = c.var;

        console.log("/api/v1/orders/complete/:id: ", id);

        if (!id) return c.text('Missing Order ID Error!', 401);

        try {
            const result = await database
                .update(schema.orders)
                .set({ completed: true, completed_at: new Date() })
                .where(eq(schema.orders.id, id))
                .returning();

            return c.json(result);
            
        } catch (error: any) {
            console.error("Error sending order: ", error.message);
            
            return c.text(error.message, 500);
        }
    })

export { ordersRoutes };