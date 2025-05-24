/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface IFormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  value?: any;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SFormTextArea = ({
  name,
  label,
  placeholder,
  control,
  onChange,
  value,
  className = "",
  ...rest
}: IFormTextAreaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              value={value ?? field.value}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className={className}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SFormTextArea;
