import express from "express";
import { getUserDetails } from "../controllers/dashboard.controllers.js";
import authMiddleware from "../middlewares/users.middleware.js";

const router = express.Router();

router.get("/get-data/:name", authMiddleware, getUserDetails);

export default router;