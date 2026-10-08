import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import Reservation from "../models/Reservation.js";
import { confirmOrder } from "../services/reservationService.js";
import { notify } from "../services/notificationService.js";

export async function getOrders(req, res) {
  const data = await Order.find().populate("items.inventoryId").sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
}

export async function getOrder(req, res) {
  const data = await Order.findById(req.params.id).populate("items.inventoryId");
  if (!data) return res.status(404).json({ success: false, message: "Order not found" });
  res.json({ success: true, data });
}

export async function createOrder(req, res) {
  const { customer, items } = req.body;
  if (!customer?.name || !Array.isArray(items) || !items.length)
    return res.status(400).json({ success: false, message: "customer.name and at least one item are required" });

  const normalized = [];
  let totalAmount = 0;
  for (const x of items) {
    if (!x.inventoryId || !Number.isInteger(Number(x.quantity)) || Number(x.quantity) < 1)
      return res.status(400).json({ success: false, message: "Each item requires inventoryId and a positive integer quantity" });
    const inv = await Inventory.findById(x.inventoryId);
    if (!inv) return res.status(404).json({ success: false, message: `Inventory item not found: ${x.inventoryId}` });
    const unitPrice = Number(x.unitPrice || 0);
    normalized.push({ inventoryId: inv._id, productName: inv.name, sku: inv.sku, quantity: Number(x.quantity), unitPrice });
    totalAmount += unitPrice * Number(x.quantity);
  }

  const data = await Order.create({
    orderNumber: `ORD-${Date.now()}`,
    customer: { name: customer.name.trim(), email: customer.email || "" },
    items: normalized,
    totalAmount
  });
  await notify(req.user, { type: "success", title: "Order created", message: `${data.orderNumber} was created successfully.` });
  res.status(201).json({ success: true, message: "Order created successfully", data });
}

export async function updateOrder(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  if (order.reservationStatus === "Confirmed")
    return res.status(409).json({ success: false, message: "Confirmed orders cannot be edited" });

  const { customer, status } = req.body;
  if (customer?.name !== undefined) order.customer.name = String(customer.name).trim();
  if (customer?.email !== undefined) order.customer.email = String(customer.email).trim();
  if (status !== undefined) {
    if (!["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(status))
      return res.status(400).json({ success: false, message: "Invalid order status" });
    order.status = status;
  }
  await order.save();
  res.json({ success: true, message: "Order updated", data: order });
}

export async function deleteOrder(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  if (order.reservationStatus === "Active")
    return res.status(409).json({ success: false, message: "Release the active reservation before deleting this order" });
  await Reservation.deleteMany({ order: order._id });
  await order.deleteOne();
  res.json({ success: true, message: "Order deleted" });
}

export async function confirmOrderController(req, res) {
  const data = await confirmOrder(req.params.id);
  res.json({ success: true, message: "Order confirmed and reserved stock deducted", data });
}
