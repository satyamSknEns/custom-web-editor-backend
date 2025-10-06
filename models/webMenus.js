import mongoose from "mongoose";

const webMenuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    handle: { type: String, required: true },
    inUse: { type: Boolean, default: false },
    menuItems: [],
  },
  {
    timestamps: true,
  }
);

export const webMenuModel = mongoose.model("webMenu", webMenuSchema);
