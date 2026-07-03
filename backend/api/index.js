import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import listingRoute from "./routes/listing.js";
import reservationRoute from "./routes/reservations.js";
import pg from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "redis";

const app = express();
const { Pool } = pg;

app.use(cookieParser());
app.use(express.json());

if (!process.env.DATABASE_URL) {
  throw new Error(".env not loaded or DATABASE_URL is missing");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

export const redis = createClient({ url: process.env.REDIS_URL });
redis.on("connect", () => console.log("Redis is connected!"));
redis.on("error", () => console.log("Error!"));
await redis.connect();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/listings", listingRoute);
app.use("/api/reservations", reservationRoute);

app.listen(3000, () => {
  console.log("Server is runnig.");
});
