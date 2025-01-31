import React from "react";
import { MatrixColor, Task } from "../../types";
import TaskItem from "../TaskItem";

interface PriorityBoxProps {
  color: MatrixColor;
  label: string;
  tasks: Task[];
}

const PriorityBox: React.FC<PriorityBoxProps> = ({ color, label, tasks }) => {
  const bgClasses: Record<MatrixColor, string> = {
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
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityBox;
