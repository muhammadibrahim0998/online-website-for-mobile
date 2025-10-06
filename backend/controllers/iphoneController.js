import Iphone from "../models/iphoneModel.js";

// 📌 Add new product
export const addIphone = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = await Iphone.create({ name, price, description, image });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding iphone:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📌 Get all products
export const getAllIphones = async (req, res) => {
  try {
    const products = await Iphone.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching iphones:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📌 Get single product by ID
export const getIphoneById = async (req, res) => {
  try {
    const product = await Iphone.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
