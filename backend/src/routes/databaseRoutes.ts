import { Hono } from "hono";
import { Context } from "hono";
import { validator } from "hono/validator";

import * as schema from '../../database/schemas';


const databaseRoutes = new Hono();

databaseRoutes
    .get('/', async (c: Context) => {
        try {
        const tables = Object.keys(schema);
        const tablesWithColumns = tables
            .map((table: string | any) => {

                if (["usersRelations", "validations"].includes(table)) return null;

                const columns = Object
                    .keys((schema as any)[table])
                    .map((column: string) => ({
                        ...(schema as any)[table][column].config,
                        default: ((schema as any)[table][column]?.default || null)
                    }));
                
                const data = ({
                    table,
                    columns
                });

                return data;
            })
            .filter((value: any) => value);

        return c.json(tablesWithColumns);

        } catch (error: any) {

            return c.json(error);
        }
    })
    .get('/table/:table', async (c: Context) => {
        const table = c.req.param('table');
        const { database } = c.var;
        const tableSchema = schema[table as keyof typeof schema];

        try {
            const result = await database
                .query
                ?.[table]
                .findMany();

            return c.json(result);
            
        } catch (error: any) {
            console.error("Error fetching tables: ", error);
            
            return c.text(error.message, 500);
        }
    })
    .post('/table/:table', validator('json', (value: any, c: Context) => {
        // Validations on the server side for POST requests

        // const parsed = (validationMap[table as keyof typeof validationMap] as any)
        //     .safeParse(formattedValues);

        // if (!parsed.success) return c.text('Invalid!', 401);

        // return parsed.data;

        return value;
    }),
    async (c: Context) => {
        const table = c.req.param('table');
        const { database } = c.var;
        const tableSchema = schema[table as keyof typeof schema];
        const values = c.req.parseBody();

        try {
            const result = await database
                .insert(tableSchema)
                .values(values)
                .returning();

            return c.json(result);
            
        } catch (error: any) {
            console.error("Error inserting into tables: ", error);
            
            return c.text(error.message, 500);
        }
    })


export { databaseRoutes }