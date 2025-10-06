import express from "express";
import {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "./controller/index.js";

const router = express.Router();

router.post("/create_menu", createMenu);
router.get("/menu", getMenus);
router.get("/menu/:id", getMenuById);
router.post("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);
export default router;
