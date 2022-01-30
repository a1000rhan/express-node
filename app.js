const express = require("express");
const products = require("./products");
const app = express();

app.listen(8001, () => {
  console.log("The application is running on localhost:8000");
});

app.get("/products", (req, res) => {
  res.json(products);
});
