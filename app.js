const express = require("express");
const products = require("./products");
const app = express();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
app.get("/", (req, res) => {
  console.log("HELLO");
});
app.get("/products", (req, res) => {
  app.json(products);
});
