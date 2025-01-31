import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DateTimePickerField from "@/components/form/fields/DateTimePickerField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/fields/InputField";
import { useTasksStore } from "@/stores/tasks";
import { priorityOptions } from "../utils";
import { Task } from "../types";
import React from "react";

const formSchema = z.object({
  title: z.string(),
  priority: z.string(),
  due_date: z.date(),
});

interface TaskFormProps {
  task?: Task;
  isExternalConfirm?: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  isExternalConfirm,
  formRef,
}) => {
  const { addTask, editTask } = useTasksStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      priority: task?.priority || "",
      due_date: task?.due_date ? new Date(task.due_date) : null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values: ", values);

    if (task) {
      editTask(task.id, values);
    } else {
      addTask(values);
    }
  }

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

        {!isExternalConfirm && <Button type="submit">Add task</Button>}
      </form>
    </Form>
  );
};

export default TaskForm;
