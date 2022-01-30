const express = require("express");
const productRoute = require("./Products/routes");

const app = express();
app.use(express.json()); //middleware

//server use

//return all products

app.use("/products", productRoute);
app.listen(8003, () => {
  console.log("The application is running on localhost:8000");
});
