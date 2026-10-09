import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";
import Notification from "../models/Notification.js";
import { ownedFilter } from "../utils/ownership.js";

export async function getDashboard(req, res) {
  const owner = ownedFilter(req.user);
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const [inventory, activeReservations, ordersToday, expired, recentReservations, recentNotifications] = await Promise.all([
    Inventory.aggregate([
      { $match: owner },
      { $group: { _id: null, total: { $sum: "$totalStock" }, reserved: { $sum: "$reservedStock" } } }
    ]),
    Reservation.countDocuments({ ...owner, status: "Active" }),
    Order.countDocuments({ ...owner, createdAt: { $gte: today } }),
    Reservation.countDocuments({ ...owner, status: "Expired" }),
    Reservation.find({ ...owner }).populate("order").sort({ createdAt: -1 }).limit(6),
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5)
  ]);

  const totals = inventory[0] || { total: 0, reserved: 0 };

  res.json({
    success: true,
    data: {
      stats: {
        totalInventory: totals.total,
        reservedInventory: totals.reserved,
        availableInventory: totals.total - totals.reserved,
        activeReservations,
        ordersToday,
        expiredReservations: expired
      },
      recentReservations,
      recentNotifications
    }
  });
}
