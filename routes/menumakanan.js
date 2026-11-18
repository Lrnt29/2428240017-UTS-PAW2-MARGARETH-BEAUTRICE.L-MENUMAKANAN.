import { Router } from "express";
import {
  createMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menumakananController.js";
import validateObjectId from "../middleware/validateObjectId.js";
import validateMenu from "../middleware/validateMenu.js";

const router = Router();

router.post("/", validateMenu, createMenu);
router.get("/", getAllMenu);
router.get("/:id", validateObjectId, getMenuById);
router.put("/:id", validateObjectId, validateMenu, updateMenu);
router.delete("/:id", validateObjectId, deleteMenu);

export default router;
