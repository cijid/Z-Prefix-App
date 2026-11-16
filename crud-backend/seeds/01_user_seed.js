/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();

  // Inserts seed entries
  await knex("user").insert([
    {
      id: 1,
      First_Name: "John",
      Last_Name: "Doe",
      Username: "johndoe",
      Password: "password123",
    },
    {
      id: 2,
      First_Name: "Jane",
      Last_Name: "Smith",
      Username: "janesmith",
      Password: "password456",
    },
    {
      id: 3,
      First_Name: "Mike",
      Last_Name: "Johnson",
      Username: "mikejohnson",
      Password: "password789",
    },
  ]);
};
