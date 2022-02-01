const Product = require("../db/models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    //this mothed take only what inside the ""
    const productArray = await Product.find({}).select(
      "name image price color"
    );

    res.json(productArray);
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

exports.getDetail = (req, res, next) => {
  try {
    const { id } = req.params; //must ne req
    const oneProduct = Product.findById({ _id: id });
    // const oneProduct = products.find((e) => e.id === +id);
    res.json(oneProduct);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

exports.createProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const newProduct = await Product.create(req.body);

    res.json(newProduct);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndDelete({ _id: id });
    if (foundProduct) {
      // products = products.filter((prod) => prod.id !== +id);
      res.status(204).end().json({ message: "deleted" });
    } else {
      next({ status: 404, message: "cannot deleted " });
    }
  } catch (e) {
    next(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    //new:true to to show the update after change immiditly
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (product) {
      res.json(product);
    } else {
      next({ status: 404, message: `cannot update${message}` });
    }
  } catch (e) {
    next(e);
  }
};
