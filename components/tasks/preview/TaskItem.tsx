import { Pen, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useRef } from "react";
import { Task } from "../types";
import { useTasksStore } from "@/stores/tasks";
import CustomDialog from "@/components/ui/custom/CustomDialog";
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
      <Button variant="destructive" size="icon">
        <Trash />
      </Button>
    ),
  };

  const handleEditTask = () => {
    console.log("formRef: ", formRef);
    console.log("formRef.current: ", formRef.current);
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
    customContent: <TaskForm formRef={formRef} task={task} isExternalConfirm />,
  };

  return (
    <div className="text-gray-600 flex items-center space-x-2">
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
      <CustomDialog {...editButtonProps} />
      <CustomDialog {...removeButtonProps} />
    </div>
  );
};

export default TaskItem;
