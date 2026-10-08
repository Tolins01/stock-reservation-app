import Notification from "../models/Notification.js";

export async function getNotifications(req, res) {
  const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
  const data = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(limit);
  const unreadCount = await Notification.countDocuments({ user: req.user._id, read: false });
  res.json({ success: true, unreadCount, data });
}

export async function markNotificationRead(req, res) {
  const data = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true }
  );
  if (!data) return res.status(404).json({ success: false, message: "Notification not found" });
  res.json({ success: true, data });
}

export async function markAllNotificationsRead(req, res) {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
  res.json({ success: true, message: "Notifications marked as read" });
}
