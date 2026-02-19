const knex = require("knex");

const dbClient = process.env.DB_CLIENT || "mysql2";

const sqliteConfig = {
  client: "sqlite3",
  connection: {
    filename: process.env.DB_FILE || "./data/barbershop.sqlite",
  },
  useNullAsDefault: true,
};

const mysqlConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "barbershop_db",
  },
};

const db = knex(dbClient === "sqlite3" ? sqliteConfig : mysqlConfig);

async function initDb() {
  const hasUsers = await db.schema.hasTable("users");
  if (!hasUsers) {
    await db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password_hash").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
  }

  const hasTable = await db.schema.hasTable("appointments");
  if (!hasTable) {
    await db.schema.createTable("appointments", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("customer_name").notNullable();
      table.string("phone").notNullable();
      table.string("service").notNullable();
      table.string("date").notNullable();
      table.string("time").notNullable();
      table.string("status").notNullable().defaultTo("scheduled");
      table.text("notes");
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
  } else {
    const hasUserId = await db.schema.hasColumn("appointments", "user_id");
    if (!hasUserId) {
      await db.schema.alterTable("appointments", (table) => {
        table.integer("user_id").unsigned().nullable();
      });
    }
  }
}

module.exports = {
  db,
  initDb,
};
