import { Hono } from 'hono'
import { Context } from 'hono';


const themeRoutes = new Hono();

themeRoutes
    .get('/', async (c: Context) => {
        
        try {
            return c.json([]);

        } catch (error: any) {
            console.error("Error fetching staff: ", error);

            return c.text(error.message, 500);
        }
    })

export { themeRoutes };