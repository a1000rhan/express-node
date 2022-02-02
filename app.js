const express = require("express");
const productRoute = require("./Products/routes");
const shopRoute = require("./Shop/routes");
const connectDB = require("./db/database");
const cors = require("cors");
const path = require("path");

const {
  routerNotFound,
  logger,
  hundleError,
} = require("./middleware/middleware");

const app = express();

//middleware
app.use(express.json());
app.use(logger);
app.use(cors());

//return all products
app.use("/products", productRoute);
app.use("/shops", shopRoute);

//middleware
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(routerNotFound);

//middleware hundel Errors
app.use(hundleError);

//server use
connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
