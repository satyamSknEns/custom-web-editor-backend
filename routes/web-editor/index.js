import express from "express";
import {
  createWebEditor,
  getAllWebEditors,
  getWebEditorById,
  updateWebEditor,
  deleteWebEditor,
} from "./controller/index.js";

const router = express.Router();

router.post("/", createWebEditor);
router.get("/", getAllWebEditors);
router.get("/:id", getWebEditorById);
router.post("/:id", updateWebEditor);
router.delete("/:id", deleteWebEditor);

export default router;
