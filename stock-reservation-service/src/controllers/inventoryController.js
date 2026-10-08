import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";

export async function getInventory(req, res) {
  const data = await Inventory.find().sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
}

export async function getInventoryItem(req, res) {
  const data = await Inventory.findById(req.params.id);
  if (!data) return res.status(404).json({ success: false, message: "Inventory item not found" });
  res.json({ success: true, data });
}

export async function createInventory(req, res) {
  const { name, sku, totalStock } = req.body;
  if (!name?.trim() || !sku?.trim() || !Number.isInteger(Number(totalStock)) || Number(totalStock) < 0)
    return res.status(400).json({ success: false, message: "name, sku and a non-negative integer totalStock are required" });
  const normalizedSku = sku.trim().toUpperCase();
  if (await Inventory.findOne({ sku: normalizedSku }))
    return res.status(409).json({ success: false, message: "SKU already exists" });
  const data = await Inventory.create({ name: name.trim(), sku: normalizedSku, totalStock: Number(totalStock), reservedStock: 0 });
  res.status(201).json({ success: true, data });
}

export async function updateInventory(req, res) {
  const item = await Inventory.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Inventory item not found" });

  const { name, sku, totalStock } = req.body;
  if (name !== undefined) item.name = String(name).trim();
  if (sku !== undefined) {
    const normalizedSku = String(sku).trim().toUpperCase();
    const duplicate = await Inventory.findOne({ sku: normalizedSku, _id: { $ne: item._id } });
    if (duplicate) return res.status(409).json({ success: false, message: "SKU already exists" });
    item.sku = normalizedSku;
  }
  if (totalStock !== undefined) {
    const stock = Number(totalStock);
    if (!Number.isInteger(stock) || stock < item.reservedStock)
      return res.status(400).json({ success: false, message: `Total stock must be an integer at least ${item.reservedStock}` });
    item.totalStock = stock;
  }
  await item.save();
  res.json({ success: true, message: "Inventory updated", data: item });
}

export async function deleteInventory(req, res) {
  const item = await Inventory.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Inventory item not found" });
  if (item.reservedStock > 0)
    return res.status(409).json({ success: false, message: "Cannot delete inventory with reserved stock" });

  const [usedByOrder, usedByReservation] = await Promise.all([
    Order.exists({ "items.inventoryId": item._id }),
    Reservation.exists({ "items.inventoryId": item._id }),
  ]);
  if (usedByOrder || usedByReservation)
    return res.status(409).json({ success: false, message: "Cannot delete inventory that is referenced by an order or reservation" });

  await item.deleteOne();
  res.json({ success: true, message: "Inventory deleted" });
}
