import Database from "better-sqlite3";
export const db = new Database("tasks.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(
  `
  CREATE TABLE IF NOT EXISTS tasks (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT NOT NULL,
   done BOOLEAN NOT NULL DEFAULT FALSE
  )
  `
)
