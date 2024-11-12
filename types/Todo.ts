export type Todo = {
  _id: string;
  title: string;
  description: string;
  summary: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  priority: Priority;
  status: Status;
}

export enum Priority {
  VERY_LOW = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
  CRITICAL = 5
}

export enum Status {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2
}

export type CreateTodoDTO = {
  title: string;
  description: string;
  priority?: Priority;
  status?: Status;
  summary?: string;
}
