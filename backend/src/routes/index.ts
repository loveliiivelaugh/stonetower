import { Hono } from 'hono';
import { Context } from 'hono';

import { themeRoutes } from './themeRoutes';
import { tablesRoutes } from './tablesRoutes';
import { ordersRoutes } from './ordersRoutes';
import { staffRoutes } from './staffRoutes';
import { signinRoutes } from './signinRoutes';
import { schemaRoutes } from './schemaRoutes';
import { inventoryRoutes } from './inventoryRoutes';
import { stripeRoutes } from './stripeRoutes';


const paths = {
    "theme": "/api/v1/theme",
    "tables": "/api/v1/tables",
    "orders": "/api/v1/orders",
    "staff": "/api/v1/staff",
    "signin": "/api/v1/signin",
    "schema": "/api/v1/schema",
    "inventory": "/api/v1/inventory",
    "stripe": "/api/v1/stripe"
};


const routes = new Hono();


routes.get('/', (c: Context) => {
    return c.text("Stone Tower Pizza Backend routes")
});  

routes.route(paths.theme, themeRoutes);
routes.route(paths.tables, tablesRoutes);
routes.route(paths.orders, ordersRoutes);
routes.route(paths.signin, signinRoutes);
routes.route(paths.schema, schemaRoutes);
routes.route(paths.staff, staffRoutes);
routes.route(paths.inventory, inventoryRoutes);
routes.route(paths.stripe, stripeRoutes);

export { routes };