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

const formSchema = z.object({
  title: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  // steps: string[],
});

const TaskForm = () => {
  const { addTask } = useTasksStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: "",
      dueDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTask(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField form={form} fieldId="title" label="Title" />

        <SelectField
          form={form}
          fieldId="priority"
          label="Priority"
          options={priorityOptions}
        />

        <DateTimePickerField form={form} fieldId="dueDate" label="Due date" />

        <Button type="submit">Add task</Button>
      </form>
    </Form>
  );
};

export default TaskForm;
