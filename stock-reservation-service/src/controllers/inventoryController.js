import Inventory from "../models/Inventory.js";

export async function getInventory(req,res){
    const data=await Inventory.find().sort({createdAt:-1});
    res.json({success:true,count:data.length,data});
}
export async function getInventoryItem(req,res){
    const data=await Inventory.findById(req.params.id);
    if(!data)return res.status(404).json({success:false,message:"Inventory item not found"});
    res.json({success:true,data});
}

export async function createInventory(req,res){
    const {name,sku,totalStock}=req.body;
    if(!name||!sku||!Number.isInteger(totalStock)||totalStock<0)
        return res.status(400).json({success:false,message:"name, sku and a non-negative integer totalStock are required"});
    if(await Inventory.findOne({sku:sku.toUpperCase()}))
        return res.status(409).json({success:false,message:"SKU already exists"});
    const data=await Inventory.create({name,sku,totalStock,reservedStock:0});
    res.status(201).json({success:true,data});
}
