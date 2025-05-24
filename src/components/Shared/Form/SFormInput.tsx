/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";

interface IFormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  type?: "text" | "password" | "number" | "email" | "file";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?:any
}

const SFormInput = ({
  name,
  label,
  placeholder,
  control,
  type = "text",
  onChange,
  className
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
              className={className}
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SFormInput;
