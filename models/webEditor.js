import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  subCategoryName: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  settings: [{}],
});

const webEditorSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    categoryName: { type: String, required: true },
    subCategories: [subCategorySchema],
  },
  {
    timestamps: true,
  }
);

export const webEditorModel = mongoose.model("webEditor", webEditorSchema);
