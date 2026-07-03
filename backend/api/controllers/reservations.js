import { prisma } from "../index.js";

export const createReservation = async (req, res) => {
  const { listingId, startDate, endDate, totalPrice } = req.body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: req.user.userId,
      listingId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    },
  });

  return res.status(201).json(reservation);
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  const reservation = await prisma.reservation.findUnique({
    where: { id: parseInt(id) },
    include: { listing: true },
  });

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  const isGuest = reservation.userId != req.user.userId;
  const isHost = reservation.listing.userId == req.user.userId;

  if (!isHost && isGuest) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  await prisma.reservation.delete({
    where: { id: parseInt(id) },
  });

  return res.status(200).json({ deleted: true });
};

export const getListingReservations = async (req, res) => {
  const { listingId } = req.params;
  const listingReservations = await prisma.reservation.findMany({
    where: { listingId: parseInt(listingId) },
  });

  if (!listingReservations) {
    return res.status(404).json({ message: "Listing reservation not found!" });
  }
  return res.status(200).json(listingReservations);
};

export const getUserReservations = async (req, res) => {
  const { userId } = req.params;
  const userReservations = await prisma.reservation.findMany({
    where: { userId: parseInt(userId) },
    include: { listing: true },
  });

  if (!userReservations) {
    return res.status(404).json({ message: "User reservation not found!" });
  }
  return res.status(200).json(userReservations);
};
