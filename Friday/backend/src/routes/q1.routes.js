import express from 'express';
import { getDetails } from '../controllers/q1.controllers.js';

const router = express.Router();

router.get("/:name", getDetails);

export default router;