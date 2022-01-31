const express = require("express");
const productRoute = require("./Products/routes");
const connectDB = require("./db/database");

const app = express();
app.use(express.json()); //middleware

connectDB();
//server use

//return all products

app.use("/products", productRoute);
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
