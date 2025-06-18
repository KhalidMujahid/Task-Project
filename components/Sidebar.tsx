import React from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Calendar,
  CheckSquare,
  BarChart3,
  MessageSquare,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: FolderOpen, label: "Projects", active: true, hasSubmenu: true },
    { icon: Users, label: "Team", active: false },
    { icon: Calendar, label: "Calendar", active: false },
    { icon: CheckSquare, label: "Tasks", active: false },
    { icon: BarChart3, label: "Reporting", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
  ];

  const projects = [
    { name: "All projects", count: 3, active: true },
    { name: "Design system", active: false },
    { name: "User flow", active: false },
    { name: "UX research", active: false },
  ];

  const tasks = [
    { name: "All tasks", count: 11, active: false },
    { name: "To do", count: 3, active: false },
    { name: "In progress", count: 4, active: false },
    { name: "Done", count: 3, active: false },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Projects</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.active
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.hasSubmenu && <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Projects Submenu */}
              {item.label === "Projects" && item.active && (
                <ul className="mt-2 ml-8 space-y-1">
                  {projects.map((project, idx) => (
                    <li key={idx}>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-1 rounded text-sm transition-colors ${
                          project.active
                            ? "text-white bg-gray-800"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>{project.name}</span>
                        {project.count && (
                          <span className="text-xs text-gray-500">
                            ({project.count})
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Tasks Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Tasks</h3>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <ul className="space-y-1">
            {tasks.map((task, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center justify-between px-3 py-1 rounded text-sm transition-colors ${
                    task.active
                      ? "text-white bg-gray-800"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{task.name}</span>
                  {task.count && (
                    <span className="text-xs text-gray-500">
                      ({task.count})
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Reminders and Messages */}
        <div className="mt-8 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-400">Reminders</h3>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-400">Messages</h3>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            Light
          </Button>
          <Button variant="ghost" size="sm" className="text-white bg-gray-800">
            Dark
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
