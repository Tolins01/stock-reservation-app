import Notification from "../models/Notification.js";

export async function notify(user, { type="info", title, message }) {
  if (!user?._id || !title || !message) return null;
  try {
    return await Notification.create({ user: user._id, type, title, message });
  } catch (error) {
    console.error("Notification creation failed:", error.message);
    return null;
  }
}
