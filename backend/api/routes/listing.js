import express from "express";
import { verifyToken } from "../utils/jwt.js";
import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  getUserListings,
} from "../controllers/listing.js";

const router = express.Router();

router.post("/", verifyToken, createListing);
router.delete("/:id", deleteListing);
router.get("/", getListings);
router.get("/:listingId", getListingById);
router.get("/user/:userId", getUserListings);
export default router;
