const Order = require("../db/models/Order");

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(201).json(orders);
  } catch (e) {
    console.log(e);
  }
};

exports.newOrder = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const orderNew = await Order.create(req.body);
    return res.json(orderNew);
  } catch (error) {
    console.log(error);
  }
};
