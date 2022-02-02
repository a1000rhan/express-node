const Shop = require("../db/models/Shop");
const Product = require("../db/models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const prodcut = await Shop.findById(shopId);
    return prodcut;
  } catch (err) {
    next(err);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const shopArray = await Shop.find().populate("products", "name price");
    res.json(shopArray);
  } catch (err) {
    next(err);
  }
};

exports.createListShop = async (req, res, next) => {
  try {
    const newShop = await Shop.create(req.body);
    return res.json(newShop);
  } catch (err) {
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const oneShop = await Shop.findById({ _id: req.shop.id });
    // const oneShop = shops.find((e) => e.id === +id);
    res.json(oneShop);
  } catch (err) {
    next(err);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    await Shop.findByIdAndDelete({
      _id: req.shop.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    //new:true to to show the update after change immiditly
    const shop = await Shop.findByIdAndUpdate({ _id: req.shop.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(shop);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    req.body.shop = shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(
      { _id: shopId },
      { $push: { products: newProduct._id } }
    );

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};
