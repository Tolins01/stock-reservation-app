import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import {confirmOrder} from "../services/reservationService.js";

export async function getOrders(req,res){
    const data=await Order.find().populate("items.inventoryId").sort({createdAt:-1});
    res.json({success:true,count:data.length,data});
}
export async function getOrder(req,res){
    const data=await Order.findById(req.params.id).populate("items.inventoryId");
    if(!data)return res.status(404).json({success:false,message:"Order not found"});
    res.json({success:true,data});
}
export async function createOrder(req,res){
    const {customer,items}=req.body;
    if(!customer?.name||!Array.isArray(items)||!items.length)
        return res.status(400).json({success:false,message:"customer.name and at least one item are required"});
    const normalized=[];
    let totalAmount=0;
    for(const x of items){
        if(!x.inventoryId||!Number.isInteger(x.quantity)||x.quantity<1)
            return res.status(400).json({success:false,message:"Each item requires inventoryId and a positive integer quantity"});
        const inv=await Inventory.findById(x.inventoryId);
        if(!inv)
            return res.status(404).json({success:false,message:`Inventory item not found: ${x.inventoryId}`});
        const unitPrice=Number(x.unitPrice||0);
        normalized.push({inventoryId:inv._id,productName:inv.name,sku:inv.sku,quantity:x.quantity,unitPrice});
        totalAmount+=unitPrice*x.quantity;
    }
    const data=await Order.create({orderNumber:`ORD-${Date.now()}`,customer,items:normalized,totalAmount});
    res.status(201).json({success:true,data});
}
export async function confirmOrderController(req,res){
    const data=await confirmOrder(req.params.id);
    res.json({success:true,message:"Order confirmed and reserved stock deducted",data});
}
