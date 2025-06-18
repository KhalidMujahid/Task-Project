export type TaskStatus = "to-do" | "in-progress" | "done";

export type Task = {
  id: string;
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  progress: number;
  date: string;
  assignees: string[];
  comments: number;
  attachments: number;
};

export type TaskCardProps = {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
};

export interface TaskData {
  userId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  date: string;
  assignees: string[];
  comments: number;
  attachments: number;
}
