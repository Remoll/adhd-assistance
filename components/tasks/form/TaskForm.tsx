import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SelectField from "@/components/ui/custom/form/fields/selectField/SelectField";
import { useTasksStore } from "@/stores/tasks/tasks";
import { priorityOptions } from "../utils";
import { Task, TaskInitials, TaskPriority } from "../types";
import React from "react";
import DateTimePickerField from "@/components/ui/custom/form/fields/dateTimePickerField/DateTimePickerField";
import InputField from "@/components/ui/custom/form/fields/inputField/InputField";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const priorityEnum = z.nativeEnum(TaskPriority);

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: priorityEnum,
  due_date: z.date().nullable(),
});

interface TaskFormProps {
  task?: Task;
  hasExternalConfirm?: boolean;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  hasExternalConfirm,
  formRef,
}) => {
  const { addTask, editTask } = useTasksStore();
  const { toast } = useToast();

  const form = useForm<TaskInitials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      priority: task?.priority || TaskPriority.urgentImportand,
      due_date: task?.due_date ? new Date(task.due_date) : undefined,
    },
  });

  const onSubmit = async (values: TaskInitials) => {
    try {
      if (task) {
        await editTask(task.id, values);
      } else {
        await addTask(values);
      }

      toast({
        title: "Success",
        description: `You successfully ${task?.id ? "edit" : "add"} task: "${
          values.title
        }"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as AxiosError).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <InputField form={form} fieldId="title" label="Title" />

        <SelectField
          form={form}
          fieldId="priority"
          label="Priority"
          options={priorityOptions}
        />

        <DateTimePickerField form={form} fieldId="due_date" label="Due date" />

        {!hasExternalConfirm && <Button type="submit">Add task</Button>}
      </form>
    </Form>
  );
};

export default TaskForm;
