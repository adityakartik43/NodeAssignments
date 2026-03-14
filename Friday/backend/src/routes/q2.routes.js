import express from 'express';
import { deleteStudent, filterStudents, getData } from '../controllers/q2.controllers.js';

const router = express.Router();

router.get("/data", getData);
router.get("/filter/:course", filterStudents);
router.get("/delete/:id", deleteStudent);

export default router;