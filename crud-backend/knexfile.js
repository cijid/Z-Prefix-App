// Update with your config settings.

// Update with your config settings.
require("dotenv").config();

//Render API and backend having trouble connecting
//Test if .env file is working
// console.log(".env settings:", {
//   host: process.env.DB_HOST || "NOT SET",
//   port: process.env.DB_PORT || "NOT SET",
//   usernameset: Boolean(process.env.DB_USER),
//   passwordset: Boolean(process.env.DB_PASSWORD),
//   databaseset: Boolean(process.env.DB_NAME),
//   databaseUrlset: Boolean(process.env.DATABASE_URL),
// });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      render_url: process.env.DATABASE_URL,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
