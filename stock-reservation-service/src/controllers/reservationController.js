import Reservation from "../models/Reservation.js";
import { createReservation, releaseReservation, releaseExpiredReservations } from "../services/reservationService.js";
import { notify } from "../services/notificationService.js";

export async function getReservations(req, res) {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const data = await Reservation.find(filter).populate("order").sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
}

export async function getReservation(req, res) {
  const data = await Reservation.findById(req.params.id).populate("order");
  if (!data) return res.status(404).json({ success: false, message: "Reservation not found" });
  res.json({ success: true, data });
}

export async function createReservationController(req, res) {
  const data = await createReservation(req.body);
  await notify(req.user, { type: "success", title: "Reservation created", message: `${data.reservationNumber} is active until ${new Date(data.expiresAt).toLocaleString()}.` });
  res.status(201).json({ success: true, message: "Reservation created successfully", data });
}

export async function updateReservationController(req, res) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found" });
  if (reservation.status !== "Active") return res.status(409).json({ success: false, message: "Only active reservations can be edited" });

  const expiresAt = new Date(req.body.expiresAt);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date())
    return res.status(400).json({ success: false, message: "expiresAt must be a valid future date" });

  reservation.expiresAt = expiresAt;
  await reservation.save();
  res.json({ success: true, message: "Reservation updated", data: await Reservation.findById(reservation._id).populate("order") });
}

export async function deleteReservationController(req, res) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found" });
  if (reservation.status === "Active")
    return res.status(409).json({ success: false, message: "Release the active reservation before deleting it" });
  await reservation.deleteOne();
  res.json({ success: true, message: "Reservation deleted" });
}

export async function releaseReservationController(req, res) {
  const data = await releaseReservation(req.params.id);
  await notify(req.user, { type: "info", title: "Reservation released", message: `${data.reservationNumber} released the reserved stock.` });
  res.json({ success: true, message: "Reservation released and stock returned", data });
}

export async function releaseExpiredController(req, res) {
  const releasedCount = await releaseExpiredReservations();
  res.json({ success: true, message: `${releasedCount} expired reservation(s) released`, releasedCount });
}
