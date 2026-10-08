import User from "../models/User.js";

export async function getUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users.map((u) => u.toSafeObject()) });
}

export async function getUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user.toSafeObject() });
}

export async function updateUserRole(req, res) {
  const { role } = req.body;
  if (!["admin", "manager", "staff"].includes(role))
    return res.status(400).json({ success: false, message: "Invalid role" });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, message: "User role updated", data: user.toSafeObject() });
}

export async function deleteUser(req, res) {
  if (String(req.user._id) === String(req.params.id))
    return res.status(400).json({ success: false, message: "You cannot delete your own account from this page" });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  await user.deleteOne();
  res.json({ success: true, message: "User deleted" });
}
