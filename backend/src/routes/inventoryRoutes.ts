import { Hono } from 'hono'
import { Context } from 'hono';
import path from 'path';


const inventoryRoutes = new Hono();


inventoryRoutes
    .get('/', async (c: Context) => {
        const { database } = c.var;
        
        try {
            const result = await database
                .query
                .products
                .findMany();
                
            return c.json(result);

        } catch (error: any) {
            console.error("Error fetching inventory: ", error);

            return c.text(error.message, 500);
        }
    })
    .get("/image/:imageName", async (c: Context) => {
        const name = c.req.param('imageName');
        
        if (!name) {
            return c.text('Missing name parameter', 400);
        };

        const filePath: string = path.join(__dirname, '../../../../../FamilyAppsSuite/stonetowerpizza/backend/assets/images/', name as string); // Path to your local image file

        try {
            // Check if the file exists
            const bunFile = Bun.file(filePath);
            const fileExists = await bunFile.exists();

            if (!fileExists) {
                return c.text('File not found', 404);
            };

            // Read the file content
            const data = await bunFile.arrayBuffer();
            
            // Convert the ArrayBuffer to a Base64 string
            const base64String = Buffer.from(data).toString('base64');

            // Return the Base64 string as a JSON response
            return c.json(`data:image/jpeg;base64,${base64String}`);

        } catch (error) {
            console.error('Error reading file:', error);
            return c.text('Internal server error', 500);
        }
    });



export { inventoryRoutes };