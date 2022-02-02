const express = require("express");
const routers = express.Router();
const {
  createListShop,
  getShop,
  createProduct,
  getDetail,

  deleteShop,
  updateShop,
  fetchShop,
} = require("./controller");

routers.param("shopId", async (req, res, next, id) => {
  const shop = await fetchShop(id, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "product not found" });
  }
});

routers.get("/", getShop);
routers.post("/", createListShop);
routers.post("/:shopId/products", createProduct);
routers.get("/:shopId", getDetail);
routers.delete("/:shopId", deleteShop);
routers.put("/:shopId", updateShop);

module.exports = routers;
