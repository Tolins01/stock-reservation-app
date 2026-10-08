import { Router } from "express";
import {
  getReservations, getReservation, createReservationController,
  updateReservationController, deleteReservationController,
  releaseReservationController, releaseExpiredController
} from "../controllers/reservationController.js";

const r = Router();
r.get("/", getReservations);
r.get("/:id", getReservation);
r.post("/", createReservationController);
r.post("/release-expired", releaseExpiredController);
r.post("/:id/release", releaseReservationController);
r.patch("/:id", updateReservationController);
r.delete("/:id", deleteReservationController);
export default r;
