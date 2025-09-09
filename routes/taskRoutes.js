import express from 'express';
import { 
  getTasks, 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controller/taskController.js';

const router = express.Router();

// Routes for a single task (ID comes first)
router.route('/:id')
  .get(getTaskById)    // GET task by ID
  .put(updateTask)     // PUT update task by ID
  .delete(deleteTask); // DELETE task by ID

// Routes for all tasks
router.route('/')
  .get(getTasks)       // GET all tasks
  .post(createTask);   // POST create new task

export default router;
