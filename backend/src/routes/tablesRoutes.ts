import { Hono } from 'hono'
import { Context } from 'hono';
import { validator } from 'hono/validator';

import * as schema from '../../database/schemas';


const tablesRoutes = new Hono();


tablesRoutes
    .get('/', async (c: Context) => {
        const { database } = c.var;
        
        try {
            const result = await database
                .query
                .tables
                .findMany();

            return c.json(result);

        } catch (error: any) {
            console.error("Error fetching tables: ", error);

            return c.text(error.message, 500);
        }
    })

    .post('/', validator('json', (value: any, c: Context) => {
        // Validations on the server side for POST requests

        // const parsed = (validationMap[table as keyof typeof validationMap] as any)
        //     .safeParse(formattedValues);

        // if (!parsed.success) return c.text('Invalid!', 401);

        // return parsed.data;

        return value;

    }),
    async (c: Context) => {
        const payload = await c.req.valid("json" as "json");
        const { database } = c.var;

        console.log("/api/tables: ", payload);

        try {
            // create a new table
            const result = await database
                .insert(schema.tables)
                .values(payload)
                .returning();

            return c.json(result);

        } catch (error) {
            console.log(error);
            
            return c.text('Something went wrong', 500);
        }
    });

export { tablesRoutes };