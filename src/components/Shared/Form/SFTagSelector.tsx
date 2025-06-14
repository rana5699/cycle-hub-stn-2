/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, X } from "lucide-react";
import { Controller, Control } from "react-hook-form";

interface TagSelectorProps {
  name: string;
  control: Control<any>;
  availableTags: string[];
  label?: string;
  preValue?: string[];
}

const SFTagSelector = ({
  name,
  control,
  availableTags,
  label,
  preValue = [],
}: TagSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        control={control}
        name={name}
        defaultValue={preValue}
        render={({ field }) => {
          const { value = [], onChange } = field;

          const handleTagToggle = (tag: string) => {
            if (value.includes(tag)) {
              onChange(value.filter((t: string) => t !== tag));
            } else {
              onChange([...value, tag]);
            }
          };

          return (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value.length > 0
                      ? `${value.length} tag${
                          value.length > 1 ? "s" : ""
                        } selected`
                      : "Select tags"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search tags..." />
                    <CommandList>
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {availableTags.map((tag) => (
                          <CommandItem
                            key={tag}
                            onSelect={() => handleTagToggle(tag)}
                            className="flex items-center"
                          >
                            <Checkbox
                              checked={value.includes(tag)}
                              className="mr-2"
                            />
                            <span>{tag}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {value.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1 text-white"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer text-white"
                        onClick={() => handleTagToggle(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default SFTagSelector;
