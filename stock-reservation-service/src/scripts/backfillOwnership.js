import "dotenv/config";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";

const email = process.env.OWNERSHIP_MIGRATION_EMAIL;

async function run() {
  if (!email) throw new Error("Set OWNERSHIP_MIGRATION_EMAIL to an existing admin/manager email before running this migration.");

  await connectDB();
  const owner = await User.findOne({ email: email.toLowerCase().trim() });
  if (!owner) throw new Error(`No user found for ${email}`);
  if (!["admin", "manager"].includes(owner.role)) {
    throw new Error("OWNERSHIP_MIGRATION_EMAIL must belong to an admin or manager account.");
  }

  const [inventory, orders, reservations] = await Promise.all([
    Inventory.updateMany({ owner: { $exists: false } }, { $set: { owner: owner._id } }),
    Order.updateMany({ owner: { $exists: false } }, { $set: { owner: owner._id } }),
    Reservation.updateMany({ owner: { $exists: false } }, { $set: { owner: owner._id } })
  ]);

  console.log("Ownership migration complete:", {
    inventory: inventory.modifiedCount,
    orders: orders.modifiedCount,
    reservations: reservations.modifiedCount,
    owner: owner.email
  });

  process.exit(0);
}

run().catch((error) => {
  console.error("Ownership migration failed:", error.message);
  process.exit(1);
});
