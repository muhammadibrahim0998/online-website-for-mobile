import Vivo from "../models/vivoModel.js";

// ➤ Add Product
export const addVivo = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const vivo = await Vivo.create({ name, description, price, image });
    res.status(201).json({ success: true, data: vivo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➤ Get All Products
export const getAllVivo = async (req, res) => {
  try {
    const vivoList = await Vivo.findAll();
    res.json({ success: true, data: vivoList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➤ Delete Product
export const deleteVivo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vivo.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
