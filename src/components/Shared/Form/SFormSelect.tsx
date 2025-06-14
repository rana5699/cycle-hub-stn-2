/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SFormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  options: Option[];
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

const SFormSelect = ({
  name,
  label,
  placeholder = "Select an option",
  control,
  options,
  className,
  disabled = false,
  onChange,
  value,
}: SFormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              value={value || field.value}
              disabled={disabled}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SFormSelect;
