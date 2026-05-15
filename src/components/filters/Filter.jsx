"use client";

import { Box, Button, TextField } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function FilterMenu({ label, value, options, onSelect, scrollable = false }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button variant="soft" className="w-full justify-between gap-2 sm:w-auto sm:min-w-32">
          <span className="truncate">{value || label}</span>
          <ChevronDownIcon
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className={`bg-white rounded shadow border border-gray-200 p-1 ${
          scrollable ? "max-h-60 overflow-y-auto" : ""
        }`}
        sideOffset={4}
      >
        <DropdownMenu.Item
          className="px-4 py-1 text-sm hover:bg-gray-100 cursor-pointer rounded outline-none"
          onSelect={() => onSelect("")}
        >
          All
        </DropdownMenu.Item>
        {options.map((option) => (
          <DropdownMenu.Item
            key={option}
            className="px-4 py-1 text-sm hover:bg-gray-100 cursor-pointer rounded outline-none"
            onSelect={() => onSelect(option)}
          >
            {option}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default function Filter({
  value,
  onChange,
  locationOptions,
  storeOptions,
  statusOptions,
}) {
  const update = (key, nextValue) => {
    onChange({ ...value, [key]: nextValue });
  };

  return (
    <Box className="rounded-t-md p-0 sm:p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <TextField.Root
          placeholder="Issue No."
          value={value.issueNo}
          onChange={(e) => update("issueNo", e.target.value)}
          className="w-full rounded-md border border-gray-200 sm:w-40"
        />

        <TextField.Root
          placeholder="MRN No."
          value={value.mrnId}
          onChange={(e) => update("mrnId", e.target.value)}
          className="w-full rounded-md border border-gray-200 sm:w-40"
        />

        <TextField.Root className="w-full rounded-md border border-gray-200 px-2 sm:w-40">
          <input
            type="date"
            value={value.fromDate}
            onChange={(e) => update("fromDate", e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          <TextField.Slot side="right" />
        </TextField.Root>

        <TextField.Root className="w-full rounded-md border border-gray-200 px-2 sm:w-40">
          <input
            type="date"
            value={value.toDate}
            onChange={(e) => update("toDate", e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          <TextField.Slot side="right" />
        </TextField.Root>

        <FilterMenu
          label="Location"
          value={value.location}
          options={locationOptions}
          onSelect={(next) => update("location", next)}
          scrollable
        />

        <FilterMenu
          label="Store"
          value={value.store}
          options={storeOptions}
          onSelect={(next) => update("store", next)}
        />

        <FilterMenu
          label="Status"
          value={value.status}
          options={statusOptions}
          onSelect={(next) => update("status", next)}
        />
      </div>
    </Box>
  );
}
