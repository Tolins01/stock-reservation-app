import {Router} from "express";
import {getOrders,getOrder,createOrder,confirmOrderController} from "../controllers/orderController.js";

const r=Router();
r.get("/",getOrders);
r.get("/:id",getOrder);
r.post("/",createOrder);
r.post("/:id/confirm",confirmOrderController);
export default r;