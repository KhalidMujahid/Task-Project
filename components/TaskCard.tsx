import { TaskCardProps } from "@/interfaces/task";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleUpdate = async () => {
    setLoadingUpdate(true);
    try {
      const updatedTask = {
        ...task,
        progress: Math.min(task.progress + 10, 100),
      };
      await axios.put(`/api/tasks/${task._id}`, updatedTask);
      onUpdate(updatedTask);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    setLoadingDelete(true);
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      onDelete(task.id);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const getStatusColor = (status: string) =>
    clsx(
      "px-2 py-0.5 rounded-full text-white text-[0.7rem] uppercase tracking-wide font-medium",
      {
        "bg-blue-500": status === "to-do",
        "bg-yellow-500": status === "in-progress",
        "bg-green-600": status === "done",
        "bg-gray-500": !["to-do", "in-progress", "done"].includes(status),
      }
    );

  return (
    <article className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md mb-4">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div>
          <header className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {task.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          </header>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={clsx("h-full transition-all", {
                  "bg-green-500": task.progress >= 80,
                  "bg-yellow-500": task.progress < 80 && task.progress >= 40,
                  "bg-red-500": task.progress < 40,
                })}
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
              {task.progress}%
            </span>
          </div>

          {/* Meta info */}
          <ul className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <li>
              <strong>ID:</strong> {task.id}
            </li>
            {task.date && (
              <li>
                <strong>Due:</strong> {new Date(task.date).toLocaleDateString()}
              </li>
            )}
            {task.status && (
              <li className="flex items-center gap-1">
                <strong>Status:</strong>
                <span className={getStatusColor(task.status)}>
                  {task.status}
                </span>
              </li>
            )}
            {task.priority && (
              <li>
                <strong>Priority:</strong> {task.priority}
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 items-end justify-start">
          <Button size="sm" onClick={handleUpdate} disabled={loadingUpdate}>
            {loadingUpdate ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loadingDelete}
          >
            {loadingDelete ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
