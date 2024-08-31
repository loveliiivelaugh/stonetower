import { boolean, integer, json, jsonb, pgTable, serial, text, numeric, bigint, timestamp } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";


// Database Design
// ================
// staff -> id, name, email, phone, created_at, updated_at
export const staff = pgTable("staff", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    job: text("job").notNull(),
    pay: numeric("pay", { precision: 10, scale: 2 }).notNull(),
    // managerId: bigint("manager_id").references(() => staff.id).onDelete("set null"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    // activeTables: bigint("active_tables").default(0)
});

export type Staff = InferModel<typeof staff>;
export type NewStaff = InferModel<typeof staff, "insert">;

// tables -> id, table_number, seat_count, created_at, updated_at
export const tables = pgTable("tables", {
    id: serial("id").primaryKey(),
    table_number: integer("table_number").notNull(),
    seat_count: integer("seat_count").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    activeOrders: integer("active_orders").default(0),
    // activeOrderId: bigint("active_order_id").references(() => orders.id).onDelete("set null"),
    orderHistory: jsonb("order_history").default([]).notNull(),
    employee_id: text("employee_id").notNull(),
});

export type Table = InferModel<typeof tables>;
export type NewTable = InferModel<typeof tables, "insert">;

// {
//     "type": "dine",
//     "employee_id": 1,
//     "table_number": "2",
//     "items": [
//         {
//             "id": 2,
//             "name": "Mojito",
//             "recipe": "2 oz White rum, 1 oz Lime juice, 2 tsp Sugar, Mint leaves, Soda water. Muddle mint and sugar, add rum and lime juice, top with soda water.",
//             "image": "https://example.com/images/mojito.jpg",
//             "price": 29,
//             "description": "Description 2; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam"
//         },
//         {
//             "id": 2,
//             "name": "Mojito",
//             "recipe": "2 oz White rum, 1 oz Lime juice, 2 tsp Sugar, Mint leaves, Soda water. Muddle mint and sugar, add rum and lime juice, top with soda water.",
//             "image": "https://example.com/images/mojito.jpg",
//             "price": 29,
//             "description": "Description 2; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam"
//         }
//     ]
// }
// orders -> id, employee_id, customer_id, table_id, order_id, items, created_at, updated_at
export const orders = pgTable('orders', {
    id: serial("id").primaryKey(),
    type: text('type').notNull(),
    employee_id: text('employee_id').notNull(),
    table_number: integer('table_number').notNull(),
    // employeeId: bigint().references('staff.id').onDelete('SET NULL'),
    // customerId: bigint().references('customers.id').onDelete('SET NULL'),
    // tableId: bigint().references('tables.id').onDelete('SET NULL'),
    // orderId: bigint().notNull(),
    items: jsonb("items").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    completed: boolean("completed").default(false),
    completedAt: timestamp("completed_at"),
    cancelled: boolean("cancelled").default(false),
    // cancelledAt: timestamp(),
    // cancelledReason: text()
});

export type Order = InferModel<typeof orders>;
export type NewOrder = InferModel<typeof orders, "insert">;

// menu -> id, name, price, created_at, updated_at
export const menu = pgTable("menu", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});

export type Menu = InferModel<typeof menu>;
export type NewMenu = InferModel<typeof menu, "insert">;


// customers -> id, name, email, phone, created_at, updated_at
export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});

export type Customer = InferModel<typeof customers>;
export type NewCustomer = InferModel<typeof customers, "insert">;

