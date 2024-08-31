import { Hono } from 'hono'
import { Context } from 'hono';


const staffRoutes = new Hono();

staffRoutes
    .get('/', async (c: Context) => {
        const { database } = c.var;
        
        try {
            const result = await database
                .query
                .staff
                .findMany();
                
            // return c.json(JSON.stringify(Object.keys(c.var)));
            return c.json(result);

        } catch (error: any) {
            console.error("Error fetching staff: ", error);

            return c.text(error.message, 500);
        }
    })

export { staffRoutes };