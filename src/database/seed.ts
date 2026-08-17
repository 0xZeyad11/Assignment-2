import { db } from "../config/database";

const tasks = [
  { title: "Learn Express routing", done: true },
  { title: "Create tasks API", done: false },
  { title: "Add request logging middleware", done: true },
  { title: "Add task validation", done: false },
  { title: "Connect the API to a database", done: false },
];

const insertTask = db.prepare(
  `
    INSERT INTO tasks (title, done)
    VALUES (? , ?)
  `
);

for (const task of tasks) {
  insertTask.run(task.title, task.done ? 1 : 0);
}

console.log("Database seeded successfully....")
