import Product from "../models/Product.js";

// ✅ Shop Admin: Add new product
export const addProduct = async (req, res) => {
  try {
    console.log("Incoming Product Data:", req.body);
    console.log("Incoming File:", req.file);

    const { name, price, description, category, stock } = req.body;
    let image = "";

    if (req.file) {
      image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    if (!name || !price || !description || !category || !image) {
      return res.status(400).json({ message: "All fields including image are required." });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      image,
      category,
      stock: Number(stock) || 10,
      addedBy: req.user._id,
    });

    res.status(201).json({
      message: "Product added successfully!",
      product,
    });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Shop Admin: Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ message: "Product updated successfully!", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Shop Admin: Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all products (public)
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single product (public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Shop Admin: Get products added by this admin
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ addedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
