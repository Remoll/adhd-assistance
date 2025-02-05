import { Pen, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useRef } from "react";
import { Task } from "../types";
import { useTasksStore } from "@/stores/tasks/tasks";
import CustomDialog from "@/components/ui/custom/customDialog/CustomDialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import TaskForm from "../form/TaskForm";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, removeTask } = useTasksStore();

  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const handleRemoveTask = async () => {
    try {
      await removeTask(task.id);
      toast({
        title: "Succes",
        description: `You succesfully remove task "${task.title}"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  const removeButtonProps = {
    title: "Remove task",
    description: `Are you sure you want to remove task "${task.title}"`,
    onConfirm: handleRemoveTask,
    customTrigger: (
      <Button variant="destructive" size="icon">
        <Trash />
      </Button>
    ),
  };

  const handleEditTask = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const editButtonProps = {
    title: "Edit task",
    description: `You editing task "${task.title}"`,
    onConfirm: handleEditTask,
    customTrigger: (
      <Button size="icon">
        <Pen />
      </Button>
    ),
    customContent: (
      <TaskForm formRef={formRef} task={task} hasExternalConfirm />
    ),
  };

  const handleToggleTaskCompletion = async () => {
    try {
      await toggleTaskCompletion(task.id);

      toast({
        title: "Success",
        description: `You successfully ${
          task.completed ? "uncomplete" : "complete"
        } task: "${task.title}"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="text-gray-600 flex items-center space-x-2">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => handleToggleTaskCompletion()}
      />
      <h3
        className={
          task.completed ? "line-through text-gray-500" : "font-semibold"
        }
      >
        {task.title}
      </h3>
      <CustomDialog {...editButtonProps} />
      <CustomDialog {...removeButtonProps} />
    </div>
  );
};

export default TaskItem;
