const express = require("express");
const productRoute = require("./Products/routes");
const connectDB = require("./db/database");

const app = express();
const PORT = 8000;
//middleware
app.use(express.json());
app.use((req, res, next) => {
  //console.log(`${req.method} ${req.originalUrl}`);

  // console.log(
  //   `${req.method} ${req.protocol}://${req.hostname}:${PORT}${req.originalUrl}`
  // );

  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);

  // if (req.method === "GET") {
  //   console.log("fatched");
  // }
  // if (req.method === "POST") {
  //   console.log("POST");
  // }
  next();
});

//return all products
app.use("/products", productRoute);

//middleware
app.use((req, res) => {
  res.status(404).json({ message: "route is not found" });
});

//middleware hundel Errors
app.use((err, req, res, next) => {
  // if (err.status) {
  //   res.status(err.status).json({ message: err.message });
  // } else {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

//server use
connectDB();
app.listen(PORT, () => {
  console.log("The application is running on localhost:8000");
});
