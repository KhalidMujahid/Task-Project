"use client";

import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Plus,
  Search,
  Filter,
  Calendar,
  LogOut,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task, TaskData, TaskStatus } from "@/interfaces/task";
import TaskCard from "@/components/TaskCard";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    status?: string;
    priority?: string;
    progress?: string;
    date?: string;
    assignees?: string;
    comments?: string;
    attachments?: string;
  }>({
    title: "",
    description: "",
    status: "",
    priority: "",
    progress: "",
    date: "",
    assignees: "",
    comments: "",
    attachments: "",
  });

  const getStatusCount = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData: TaskData = {
      userId: "6852e171d1483da011872a22",
      description: newTask.description,
      title: newTask.title,
      status: newTask.status as string,
      priority: newTask.priority as string,
      progress: Number(newTask.progress),
      date:
        newTask.date ||
        new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      assignees: newTask.assignees
        ? newTask.assignees.split(",").map((a: string) => a.trim())
        : [],
      comments: Number(newTask.comments) || 0,
      attachments: Number(newTask.attachments) || 0,
    };

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      status: "",
      priority: "",
      progress: "",
      date: "",
      assignees: "",
      comments: "",
      attachments: "",
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome back, Khalid 👋
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="dark:border-gray-600"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="dark:border-gray-600"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  19 May 2022
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDark(!isDark)}
                  className="dark:border-gray-600"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  // onClick={onLogout}
                  className="dark:border-gray-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>

                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Board view
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Add view
                </span>
              </div>
              <>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-2xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                        Add New Task
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <Input
                              value={newTask.title || ""}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  title: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Status
                            </label>
                            <select
                              className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              value={newTask.status || "to-do"}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  status: e.target.value,
                                })
                              }
                            >
                              <option value="to-do">To do</option>
                              <option value="in-progress">In progress</option>
                              <option value="done">Done</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Priority
                            </label>
                            <select
                              className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              value={newTask.priority || "medium"}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  priority: e.target.value,
                                })
                              }
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Progress (%)
                            </label>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={newTask.progress || ""}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  progress: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Date
                            </label>
                            <Input
                              type="date"
                              value={newTask.date || ""}
                              onChange={(e) =>
                                setNewTask({ ...newTask, date: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Assignees (comma separated)
                            </label>
                            <Input
                              value={newTask.assignees || ""}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  assignees: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Comments
                            </label>
                            <Input
                              type="number"
                              min={0}
                              value={newTask.comments || ""}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  comments: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Attachments
                            </label>
                            <Input
                              type="number"
                              min={0}
                              value={newTask.attachments || ""}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  attachments: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <textarea
                            className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows={3}
                            value={newTask.description || ""}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                description: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Add Task
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        To do
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({getStatusCount("to-do")})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => addNewTask("to-do")}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {getTasksByStatus("to-do").map((task: Task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        In progress
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({getStatusCount("in-progress")})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => addNewTask("in-progress")}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {getTasksByStatus("in-progress").map((task: Task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>

              {/* Done Column */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Done
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({getStatusCount("done")})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => addNewTask("done")}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {getTasksByStatus("done").map((task: Task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
