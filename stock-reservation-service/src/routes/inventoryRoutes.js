import { Router } from "express";
import { getInventory, getInventoryItem, createInventory, updateInventory, deleteInventory } from "../controllers/inventoryController.js";

const r = Router();
r.get("/", getInventory);
r.get("/:id", getInventoryItem);
r.post("/", createInventory);
r.patch("/:id", updateInventory);
r.delete("/:id", deleteInventory);
export default r;
