import React from "react";
import { Task } from "../../types";
import { Checkbox } from "@/components/ui/checkbox";
import { useTasksStore } from "@/stores/tasks";

interface PriorityBoxProps {
  color: string;
  label: string;
  tasks: Task[];
}

const PriorityBox: React.FC<PriorityBoxProps> = ({ color, label, tasks }) => {
  const { toggleTaskCompletion } = useTasksStore();

  const bgClasses = {
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
  };

  return (
    <div
      className={`${bgClasses[color]} bg-opacity-70 p-4 rounded-lg shadow-md`}
    >
      <h1 className="text-gray-700 font-bold text-lg mb-2">{label}</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="text-gray-600 flex items-center space-x-2"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
            />
            <h3
              className={
                task.completed ? "line-through text-gray-500" : "font-semibold"
              }
            >
              {task.title}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityBox;
