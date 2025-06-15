import { Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FormFieldInputProps<T extends FieldValues, U> = Omit<InputHTMLAttributes<HTMLInputElement>, "form"> & {
  form: UseFormReturn<T, U, T>;
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

const FormFieldInput = <T extends FieldValues, U>({
  form,
  name,
  label,
  type,
  placeholder,
  className,
  ...props
}: FormFieldInputProps<T, U>) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <FormInput
                  field={field}
                  type={type}
                  placeholder={placeholder}
                  label={label}
                  className={className}
                  {...props}
                />
              </FormControl>
              <FormMessage className='px-[1.2rem]' />
            </FormItem>
          );
        }}
      />
    </>
  );
};

type FormInputProps = {
  field: FieldValues;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
};

const FormInput = ({ field, type, placeholder, label, className, ...props }: FormInputProps) => {
  const { error, isDirty } = useFormField();

  return (
    <Input
      {...field}
      type={type || "text"}
      placeholder={placeholder || (label ? label + "..." : "")}
      className={cn(className, error && "border-destructive", !error && isDirty && "border-constructive")}
      {...props}
    />
  );
};

export { FormFieldInput };
