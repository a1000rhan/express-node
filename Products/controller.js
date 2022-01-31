const Product = require("../db/models/Product");

let products = require("../products");

exports.getProducts = async (req, res) => {
  try {
    //this mothed take only what inside the ""
    const productArray = await Product.find({}).select(
      "name image price color"
    );
    //this method exlude only what inside the{}
    // const productArray = await Product.find(
    //   {},
    //   { color: 0, quantity: 0, slug: 0, slug_history: 0, __v: 0 }
    // );

    res.json(productArray);
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.getDetail = (req, res) => {
  try {
    const { id } = req.params; //must ne req
    const oneProduct = Product.findById({ _id: id });
    // const oneProduct = products.find((e) => e.id === +id);
    res.json(oneProduct);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await Product.create(req.body);

    /* req.body.id= products.length+1;
     const id = products.length + 1;
    const newProduct = { id: id, ...req.body };
    products.push(newProduct);*/

    res.json(newProduct);
    res.status(201).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndDelete({ _id: id });
    if (foundProduct) {
      // products = products.filter((prod) => prod.id !== +id);
      res.status(204).end().json({ message: "deleted" });
    } else {
      res.status(404).end().json({ message: "no found" });
    }
  } catch (e) {
    res.status(500).json({ massage: e.massage });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    //new:true to to show the update after change immiditly
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (product) {
      res.json(product);
      //res.status(200).end();// by defualt 200
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
