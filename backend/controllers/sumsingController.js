import Sumsing from "../models/SumsingModel.js";

// GET all products
export const getAllSumsing = async (req, res) => {
  try {
    const products = await Sumsing.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST new product
export const addSumsingProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    if (!name || !price)
      return res.status(400).json({ message: "Name & price required" });

    const product = await Sumsing.create({ name, description, price, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
