import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues } from "react-hook-form";
import { FieldProps } from "../../types";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> extends FieldProps<T> {
  options: Option[];
}

const SelectField = <T extends FieldValues>({
  form,
  fieldId,
  label,
  options,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
