import express from "express";
import { verifyToken } from "../utils/jwt.js";
import {
  createReservation,
  deleteReservation,
  getListingReservations,
  getUserReservations,
} from "../controllers/reservations.js";

const router = express.Router();

router.post("/", verifyToken, createReservation);
router.delete("/:id", verifyToken, deleteReservation);
router.get("/listing/:listingId", getListingReservations);
router.get("/user/:userId", getUserReservations);

export default router;
