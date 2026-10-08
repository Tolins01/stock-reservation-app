import { Router } from "express";
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, confirmOrderController } from "../controllers/orderController.js";

const r = Router();
r.get("/", getOrders);
r.get("/:id", getOrder);
r.post("/", createOrder);
r.patch("/:id", updateOrder);
r.delete("/:id", deleteOrder);
r.post("/:id/confirm", confirmOrderController);
export default r;
