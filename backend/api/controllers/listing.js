import { prisma } from "../index.js";
import { bust, getOrSet, listingKey } from "../utils/redis.js";

export const createListing = async (req, res) => {
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathRoomCount,
    guestCount,
    location,
    price,
  } = req.body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathRoomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price),
      userId: req.user.userId,
    },
  });
  return res.status(201).json(listing);
};

export const getListings = async (req, res) => {
  const { category } = req.query;

  const listings = await prisma.listing.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(listings);
};

export const deleteListing = async (req, res) => {
  const { id } = req.params;

  await prisma.listing.delete({
    where: { id: parseInt(id) },
  });
  //await bust(listingKey(id));
  return res.status(200).json({ deleted: true });
};

export const getListingById = async (req, res) => {
  const { listingId } = req.params;

  // const listing = await getOrSet(listingKey(listingId), 300, () =>
  //   prisma.listing.findUnique({
  //     where: { id: parseInt(listingId) },
  //     include: { user: true },
  //   }),
  // );

  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(listingId) },
    include: { user: true },
  });

  if (!listing) {
    return res.status(404).json({ message: "Listing not found!" });
  }

  return res.status(200).json({
    ...listing,
    user: {
      id: listing.user.id,
      name: listing.user.name,
      email: listing.user.email,
      image: listing.user.image,
    },
  });
};

export const getUserListings = async (req, res) => {
  const { userId } = req.params;
  const userListings = await prisma.listing.findMany({
    where: { userId: parseInt(userId) },
  });

  if (!userListings) {
    return res.status(404).json({ message: "Listing not found!" });
  }

  return res.status(200).json(userListings);
};
