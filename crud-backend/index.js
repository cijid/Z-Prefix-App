const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const knex = require("knex")(require("./knexfile.js")["development"]);
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  res.status(200).json("Hello from root route!");
});

//Get

app.get("/item", (req, res) => {
  knex("item")
    .select("*")
    .then((item) => {
      res.status(200).json(item);
    });
});

app.get("/user", (req, res) => {
  knex("user")
    .select("*")
    .then((user) => {
      res.status(200).json(user);
    });
});

//Post

// Add Item
app.post("/item", async (req, res) => {
  try {
    const [newItem] = await knex("item").insert(req.body).returning("*");
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create item",
    });
  }
});

// Create User
app.post("/user", async (req, res) => {
  try {
    const { First_Name, Last_Name, Username, Password } = req.body;
    const hashedpassword = await bcrypt.hash(Password, 10);

    const [newUser] = await knex("user")
      .insert({
        First_Name: First_Name,
        Last_Name: Last_Name,
        Username: Username,
        Password: hashedpassword,
      })
      .returning("*");

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create user",
    });
  }
});

// Login with encrypted password.
app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  const user = await knex("user").where({ Username: Username }).first();

  const passwordMatch = await bcrypt.compare(Password, user.Password);

  res.status(200).json({
    id: user.id,
    First_Name: user.First_Name,
    Last_Name: user.Last_Name,
    Username: user.Username,
  });
});

//Patch
app.patch("/item/:id", (req, res) => {
  knex("item")
    .where("id", req.params.id)
    .update(req.body)
    .returning("*")
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json(data);
    });
});

// DELETE
// Less GTA6 more Deleting things

app.delete("/item/:id", async (req, res) => {
  await knex("item").where("id", req.params.id).del();
  res.status(200).json({ message: "Item deleted" });
});

app.listen(port, () =>
  console.log(`This app is listening at http://localhost:${port}`),
);
