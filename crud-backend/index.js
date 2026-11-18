const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const knex = require("knex")(require("./knexfile.js")["development"]);

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

app.post("/item", async (req, res) => {
  try {
    const [newItem] = await knex("item").insert(req.body).returning("*");
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create report",
    });
  }
});

app.post("/user", async (req, res) => {
  const { First_Name, Last_Name, Username, Password } = req.body;

  if (!First_Name || !Last_Name || !Username || !Password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [newUser] = await knex("user")
      .insert({
        First_Name,
        Last_Name,
        Username,
        Password,
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

app.listen(port, () =>
  console.log(`This app is listening at http://localhost:${port}`),
);
