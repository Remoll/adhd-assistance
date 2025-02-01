import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldId: Path<T>;
  label: string;
}

export type { FieldProps };
