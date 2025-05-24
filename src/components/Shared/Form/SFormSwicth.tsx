/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";

interface SFormSwitchProps {
  name: string;
  label?: string;
  control: Control<any>;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const SFormSwitch = ({
  name,
  label,
  control,
  onChange,
  disabled = false,
}: SFormSwitchProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
          {label && <FormLabel className="cursor-pointer">{label}</FormLabel>}
          <FormControl>
            <Switch
              id={name}
              checked={field.value || false}
              disabled={disabled}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onChange?.(checked);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SFormSwitch;
