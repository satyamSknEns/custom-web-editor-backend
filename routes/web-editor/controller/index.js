import { webEditorModel } from "../../../models/webEditor.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createWebEditor = async (req, res) => {
  try {
    const { categoryName, subCategories } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "categoryName is required" });
    }

    if (!subCategories || !Array.isArray(subCategories)) {
      return res
        .status(400)
        .json({ message: "subCategories must be an array" });
    }

    for (const sub of subCategories) {
      if (!sub.subCategoryName || !Array.isArray(sub.settings)) {
        return res.status(400).json({
          message: "Each subCategory must have subCategoryName and settings[]",
        });
      }
    }

    const existing = await webEditorModel.findOne({ categoryName });

    if (existing) {
      const updated = await webEditorModel.findOneAndUpdate(
        { categoryName },
        {
          $set: {
            subCategories,
            updatedAt: new Date(),
          },
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updated,
      });
    } else {
      const newCategory = new webEditorModel(req.body);
      const saved = await newCategory.save();
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: saved,
      });
    }
  } catch (error) {
    console.error("[createOrUpdateWebEditor error]", error);
    res.status(500).json({
      message: "Error creating/updating category entry",
      error: error.message,
    });
  }
};

export const getAllWebEditors = async (req, res) => {
  try {
    const { categoryName } = req.query;

    const filter = {
      ...(categoryName && {
        categoryName: { $regex: new RegExp(categoryName, "i") },
      }),
    };

    const data = await webEditorModel.find(filter);

    if (data.length === 0) {
      return res.status(404).json({ message: "No web editors found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching WebEditor entries",
      error: error.message,
    });
  }
};

export const getWebEditorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const data = await webEditorModel.findOne({ categoryId: id });
    if (!data)
      return res.status(404).json({ message: "WebEditor entry not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching WebEditor entry",
      error: error.message,
    });
  }
};

export const updateWebEditor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const updated = await webEditorModel.findOneAndUpdate(
      { categoryId: id },
      {
        ...req.body,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "WebEditor entry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Error updating WebEditor entry",
      error: error.message,
    });
  }
};

export const deleteWebEditor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deleted = await webEditorModel.findOneAndDelete({ categoryId: id });

    if (!deleted)
      return res.status(404).json({ message: "WebEditor entry not found" });

    res.status(200).json({ message: "WebEditor entry deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting WebEditor entry",
      error: error.message,
    });
  }
};
