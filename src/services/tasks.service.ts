import type { NextFunction, Request, Response } from "express";
import type { Task, TaskRow } from "../types/tasks.type";
import { tasksRouter } from "../routes/tasks.route";
import type { TasksRepository } from "../repositories/tasks.repo";
import { ResponseWrapper } from "../middlewares/responseWrapper.middleware";

export class TasksService {
  constructor(private readonly taskRepo: TasksRepository) { }

  async GetAllTasks(): Promise<Task[]> {
    return await this.taskRepo.findAll();
  }

  async GetTaskById(id: number): Promise<Task | undefined> {
    const existing_task = await this.taskRepo.findTaskById(id);
    return existing_task;
  }

}
