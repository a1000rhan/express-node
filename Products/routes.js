const { request } = require("express");
const express = require("express");
const routers = express.Router();
const {
  getProducts,
  getDetail,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./controller");

routers.get("/", getProducts);

//return one product based on id #
routers.get("/:id", getDetail);

routers.post("/", createProduct);
routers.delete("/:id", deleteProduct);
routers.put("/:id", updateProduct);
module.exports = routers;
