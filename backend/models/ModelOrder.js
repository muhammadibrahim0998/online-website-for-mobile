import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Bank Transfer", "EasyPesa", "Stripe", "P2P Transfer"],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripePaymentId: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
