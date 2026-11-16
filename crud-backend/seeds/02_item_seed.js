/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item").del();

  // Inserts seed entries
  await knex("item").insert([
    {
      id: 1,
      UserId: 1,
      item_name: "Mountain Bike",
      description: "Specialized 2024 Rockhopper Elite Competition",
      quantity: 1,
    },
    {
      id: 2,
      UserId: 1,
      item_name: "USB-C Monitor",
      description:
        "ForHelp 15.6inch Portable Monitor, 1080P USB-C Second External Monitor For Laptop",
      quantity: 2,
    },
    {
      id: 3,
      UserId: 2,
      item_name: "Keyboard",
      description: "Logitech Mechanical Keyboard",
      quantity: 1,
    },
    {
      id: 4,
      UserId: 2,
      item_name: "Mouse",
      description: "Razer Wireless Mouse",
      quantity: 2,
    },
    {
      id: 5,
      UserId: 3,
      item_name: "Laptop",
      description: "Lenovo Thinkpad X1 Carbon Intel Evo",
      quantity: 1,
    },
  ]);
};
