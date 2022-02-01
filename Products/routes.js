const express = require("express");
const routers = express.Router();
const {
  getProducts,
  getDetail,
  createProduct,
  deleteProduct,
  updateProduct,
  fetchProduct,
} = require("./controller");

routers.param("productId", async (req, res, next, id) => {
  const product = await fetchProduct(id, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ status: 404, message: "product not found" });
  }
});

routers.get("/", getProducts);
//return one product based on id #
routers.get("/:productId", getDetail);

routers.post("/", createProduct);
routers.delete("/:productId", deleteProduct);
routers.put("/:productId", updateProduct);
module.exports = routers;
