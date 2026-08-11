import Product from "../models/product.js";

export async function createProduct(req, res) {
  try {
    const products = req.body;
    const { name, brand } = products;

    // Check whether body exists
    if (!products) {
      return res.status(400).json({
        message: "Product data is required",
      });
    }

    const existingProduct = await Product.findOne({
      where: {
        name,
        brand,
      },
    });

    if (existingProduct) {
      return res
        .status(409)
        .json({ message: "product with name and brand available" });
    }
    //store the data
    const newProduct = await Product.create(products);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500, not 400 - this catches DB/server errors, not just bad input
  }
}
