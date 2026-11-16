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

app.listen(port, () =>
  console.log(`Express Server listening on port ${port}.`),
);
