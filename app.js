const express = require("express");
const productRoute = require("./Products/routes");
const connectDB = require("./db/database");

const { logger, path, hundleError } = require("./middleware/middleware");

const app = express();

//middleware
app.use(express.json());
app.use(path);

//return all products
app.use("/products", productRoute);

//middleware
app.use(logger);

//middleware hundel Errors
app.use(hundleError);

//server use
connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
