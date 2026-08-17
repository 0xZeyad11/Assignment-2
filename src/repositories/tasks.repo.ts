import { db } from "../config/database";
import type { CreateTaskDTO, Task, TaskRow, UpdateTasksDTO } from "../types/tasks.type";

export class TasksRepository{

  async findAll(): Promise<Task[]> {
    const all_tasks =  db.prepare(
      `
        SELECT * FROM tasks;
      `
    )
    const res = all_tasks.all() as TaskRow[];
    return res.map(this.toTask);
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    const existing_task = db.prepare(
      `
      SELECT * FROM tasks
      WHERE id = ?
      `
    );
    const res = existing_task.get(id) as TaskRow | undefined;
    return res ? this.toTask(res) : undefined;
  }

  async deleteTasks(id: number): Promise<boolean> {
    const existing_task = db.prepare(
      `
        DELETE  FROM tasks
        WHERE id = ?
      `
    );
    const res = existing_task.run(id);
    return res.changes > 0;
  }

  async createTask(data: CreateTaskDTO) {
    const new_task = db.prepare(
      `
      CREATE INTO tasks (title)
      VALUES (?)
     `
    );
    const result = new_task.run(data.title);
    return {
      id: Number(result.lastInsertRowid),
      title: data.title,
      done: false,
    }
  }

  //TODO: Finish this function
  async updateTasks(id: number , data: UpdateTasksDTO): Promise<Task |  undefined>{
    if (!data.title && !id && !data.done) {
      return undefined;
    }
    const existing_task = this.findTaskById(id);
    if (!existing_task) {
      throw new Error(`can't find a tasks with id : ${id}`)
    }

    const update_tasks = db.prepare(
      `
      UPDATE TASKS
      SET title = ?,
      SET done = ?
      WHERE id = ?
      `
    );
    update_tasks.run(data.title, data.done ? 1 : 0, id);
  }

  private toTask(data: TaskRow): Task{
    return {
      id: data.id,
      done: Boolean(data.done),
      title: data.title
    }
  }
}
