import express from "express";
import webEditorRoutes from "./web-editor/index.js";
import webMenuRouutes from "./menus/index.js";

const router = express.Router();

router.use("/webEditor", webEditorRoutes);
router.use("/webMenu", webMenuRouutes);

export default router;
