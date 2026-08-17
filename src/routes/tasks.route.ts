import { Router, type NextFunction, type Request, type Response } from "express";
import type { TasksService } from "../services/tasks.service";
import { taskController } from "../tasks.module";

export const tasksRouter = Router();


/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - done
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Learn Express
 *         done:
 *           type: boolean
 *           example: false
 */

tasksRouter.get('/', async (req: Request, res: Response , next: NextFunction) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  })
  next();
})

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - done
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Learn Express routing
 *         done:
 *           type: boolean
 *           example: false
 *
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: Learn Swagger
 *
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Learn Express middleware
 *         done:
 *           type: boolean
 *           example: true
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Task not found
 */

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns all tasks in the task list.
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
tasksRouter.get('/tasks', taskController.getAllTasks);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task. New tasks are created with done set to false.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Task title is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// tasksRouter.post('/tasks', CreateNewTask);


/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Returns a task matching the provided ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tasksRouter.get('/tasks/:id', taskController.getTaskById);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates the title, done state, or both for an existing task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *           examples:
 *             updateTitle:
 *               summary: Update title
 *               value:
 *                 title: Learn Swagger
 *             updateState:
 *               summary: Update done state
 *               value:
 *                 done: true
 *             updateBoth:
 *               summary: Update title and state
 *               value:
 *                 title: Finish Express assignment
 *                 done: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task ID or no update properties provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// tasksRouter.put('/tasks/:id', UpdateTaskState);
/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes the task matching the provided ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// tasksRouter.delete('/tasks/:id', DeleteTask);
