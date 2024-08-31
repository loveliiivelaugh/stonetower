import { client, paths } from "../api";


export const appScripts = {

    handleOpenNewTable: async (table: any, store: any) => {
        if (store.isTableActive) {
            store.setSelectedTable(table);
        }
        else {
            const seat_count = await prompt("Starting table " + table + "\nHow many seats?");
            
            const payload = {
                table_number: parseInt(table),
                employee_id: store.session.user.id,
                seat_count: typeof seat_count !== "number" ? 2 : parseInt(seat_count)
            };

            const response = (await client.post(paths.tables, payload)).data;

            console.log("handleOpenNewTable: ", response);

            store.setSelectedTable(table); // Update this to set table on response data
        }
    },

    handleSendOrder: async (store: any) => {

        const payload = {
            type: "dine" || "carryout" || "delivery",
            employee_id: 1,
            table_number: store.selectedTable,
            items: store.items,
        }
        // send the order
        const response = (await client.post(paths.orders, payload)).data;
        console.log("handleSendOrder: ", response);

        // backend: 
        // add the order to the orders table
        // add the resulting order_id to the order_history column in the tables table
            // To query any order or all orders from the tables order_history -- can use the order_id's
        // Seperate the items in the order by category to route open product items to ...
        // ... appropriate areas of restaurants BOH, ie. kitchen, pantry, bar, etc.

        store.setState({
            activeView: "tables", // Update view
            selectedTable: null, // clear the table
            activeCategory: "drinks", // Reset default category
            items: [], // clear the cart
            drawerOpen: false // close the drawer
        });
    }

}