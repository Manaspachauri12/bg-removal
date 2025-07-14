import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number },
});

const transactionModel =
  mongoose.model.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default transactionModel;
