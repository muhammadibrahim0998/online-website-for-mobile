import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Vivo = sequelize.define(
  "vivo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "vivo", // table name in MySQL
    timestamps: false, // no createdAt/updatedAt
  }
);

export default Vivo;
