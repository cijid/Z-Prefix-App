/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item").del();
  await knex("user").del();

  // Inserts seed entries
  await knex("user").insert([
    {
      First_Name: "John",
      Last_Name: "Doe",
      Username: "johndoe",
      Password: await bcrypt.hash("password123", saltRounds),
    },
    {
      First_Name: "Jane",
      Last_Name: "Smith",
      Username: "janesmith",
      Password: await bcrypt.hash("password456", saltRounds),
    },
    {
      First_Name: "Mike",
      Last_Name: "Johnson",
      Username: "mikejohnson",
      Password: await bcrypt.hash("password789", saltRounds),
    },
  ]);
};
