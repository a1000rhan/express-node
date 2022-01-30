const products = require("../products");

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.getDetail = (req, res) => {
  try {
    const { id } = req.params; //must ne req
    const oneProduct = products.find((e) => e.id === +id);
    res.json(oneProduct);
    res.json(products);
    res.status(200).end();
  } catch (e) {
    next(e);
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
    next(e);
  }
};
exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = products.some((prod) => prod.id === +id);
    if (foundProduct) {
      newProduct = products.filter((prod) => prod.id !== +id);
      products = newProduct;
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
};
