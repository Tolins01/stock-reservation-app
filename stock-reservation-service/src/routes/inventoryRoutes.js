import {Router} from "express";
import {getInventory,getInventoryItem,createInventory} from "../controllers/inventoryController.js";

const r=Router();

r.get("/",getInventory);
r.get("/:id",getInventoryItem);
r.post("/",createInventory);
export default r;