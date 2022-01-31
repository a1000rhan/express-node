const Product = require("../db/models/Product");

let products = require("../products");

exports.getProducts = async (req, res) => {
  try {
    const productArray = await Product.find();
    res.json(productArray);
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.getDetail = (req, res) => {
  try {
    const { id } = req.params; //must ne req
    const oneProduct = products.find((e) => e.id === +id);
    res.json(oneProduct);
    res.json(products);
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.createProduct = (req, res) => {
  console.log(req.body);
  try {
    // req.body.id= products.length+1;
    const id = products.length + 1;
    const newProduct = { id: id, ...req.body };
    products.push(newProduct);
    res.json(newProduct);
    res.status(201).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = products.find((prod) => prod.id === +id);
    if (foundProduct) {
      products = products.filter((prod) => prod.id !== +id);
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (e) {
    res.status(500).json({ massage: e.massage });
  }
};
