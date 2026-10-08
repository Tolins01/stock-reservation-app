import "dotenv/config";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import Inventory from "./models/Inventory.js";
import Order from "./models/Order.js";
import User from "./models/User.js";

const items = [
  ["Laptop Sleeve", "LAP-001", 50, 5],
  ["Wireless Mouse", "MSE-002", 100, 10],
  ["Keyboard", "KBD-003", 80, 5],
  ['Monitor 24"', "MNT-004", 30, 2],
  ["USB-C Cable", "CBL-005", 200, 20],
  ["Webcam", "WCM-006", 40, 3],
  ["Headphones", "HPH-007", 60, 4],
  ["Power Bank", "PWR-008", 120, 8],
];

async function seed() {
  try {
    await connectDB();
    await Order.deleteMany({});
    await Inventory.deleteMany({});
    await User.deleteMany({});

    const adminEmail = (process.env.SEED_ADMIN_EMAIL || "admin@example.com").toLowerCase();
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin12345!";

    const admin = await User.create({
      name: process.env.SEED_ADMIN_NAME || "System Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    const inv = await Inventory.insertMany(
      items.map((x) => ({ name: x[0], sku: x[1], totalStock: x[2], reservedStock: x[3] }))
    );

    const order = await Order.create({
      orderNumber: "ORD-1005",
      customer: { name: "John Doe", email: "john@example.com" },
      items: [
        { inventoryId: inv[0]._id, productName: inv[0].name, sku: inv[0].sku, quantity: 2, unitPrice: 29.99 },
        { inventoryId: inv[1]._id, productName: inv[1].name, sku: inv[1].sku, quantity: 3, unitPrice: 19.99 },
      ],
      totalAmount: 119.95,
    });

    console.log(`Seed complete. Admin: ${admin.email}`);
    console.log(`Admin password: ${adminPassword}`);
    console.log(`Sample order: ${order.orderNumber}`);
  } catch (e) {
    console.error("Seed failed:", e);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
