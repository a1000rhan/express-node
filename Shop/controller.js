const Shop = require("../db/models/Shop");
const Product = require("../db/models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
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
    req.body.owner = req.user._id;
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
    if (!req.user._id.equals(req.shop.owner)) {
      console.log(
        "🚀 ~ file: controller.js ~ line 71 ~ exports.createProduct= ~ req.shop.owner",
        req.shop.owner
      );
      next({
        status: 401,
        message: "Your not the Owner and you cannot create new Product",
      });
    } else {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }

      const { shopId } = req.params;
      req.body.shop = shopId;
      const newProduct = await Product.create(req.body);
      await Shop.findByIdAndUpdate(
        { _id: shopId },
        { $push: { products: newProduct._id } }
      );

      return res.status(201).json(newProduct);
    }
  } catch (err) {
    next(err);
  }
};
