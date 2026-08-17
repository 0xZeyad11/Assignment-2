import type { Request , Response ,  NextFunction } from "express";
import type { TasksService } from "../services/tasks.service";
import type { CreateTaskDTO } from "../types/tasks.type";

export class TaskController {
  constructor(private readonly taskService: TasksService) {
  }
  getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.GetAllTasks();
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
   }
  }


  getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id ?? 0);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          message: "Invalid id number"
        })
        return;
      }
      const existing_task= await this.taskService.GetTaskById(id)
      if (!existing_task) {
        res.status(404).json({ message: `Task with id ${id} doesn't exist`})
        return;
      }
      res.status(200).json(existing_task);
    } catch (err) {
      next(err);
    }
  }


  createNewTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as CreateTaskDTO;
      console.log(data);
      if (!data.title) {
        res.status(400).json({
          message: "title is not provided!"
        })
        return;
      }
      const new_task =await  this.taskService.CreateNewTask(data);
      console.log(new_task);
      res.status(201).json(new_task);
    } catch (err) {
      next(err);
    }
  }
}
