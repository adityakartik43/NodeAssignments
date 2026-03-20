import express from 'express';
import { getTasks, insertTask, completeTask, deleteTask } from '../controllers/controllers.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', insertTask);
router.put('/tasks/:id', completeTask);
router.delete('/tasks/:id', deleteTask);

export default router;