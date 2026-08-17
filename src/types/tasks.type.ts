export type Task = {
  id: number;
  title: string;
  done: boolean;
}

export type TaskRow = {
  id: number,
  title: string,
  done: number
}


export type CreateTaskDTO = {
  title: string;
}

export type UpdateTasksDTO = {
  title: string;
  done: boolean;
}
