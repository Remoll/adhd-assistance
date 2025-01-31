import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Task } from "../types";
import { useTasksStore } from "@/stores/tasks";
import CustomDialog from "@/components/ui/custom/CustomDialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, removeTask } = useTasksStore();

  const { toast } = useToast();

  const handleRemoveTask = async () => {
    try {
      await removeTask(task.id);
      toast({
        title: "Succes",
        description: `You succesfully remove task "${task.title}"`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to remove task "${task.title}"`,
      });
    }
  };

  const removeButtonProps = {
    title: "Remove task",
    description: `Are you sure you want to remove task "${task.title}"`,
    onConfirm: handleRemoveTask,
    customTrigger: (
      <Button variant="destructive">
        <Trash />
      </Button>
    ),
  };

  return (
    <>
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
      <CustomDialog {...removeButtonProps} />
    </>
  );
};

export default TaskItem;
