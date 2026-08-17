import { TasksService } from "./services/tasks.service";
import { TasksRepository } from "./repositories/tasks.repo";
import { TaskController } from "./controllers/tasks.controller";

export const taskRepo = new TasksRepository();
export const taskService = new TasksService(taskRepo);
export const taskController = new TaskController(taskService);
