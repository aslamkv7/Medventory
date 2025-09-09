"use client";

import { Box } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";

export default function Filter() {
  return (
    <Box maxHeight="120px" className="p-4 mt-2">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Issue No */}
        <TextField.Root
          placeholder="Issue No."
          className="w-40 border border-gray-200 rounded-md"
        />

        {/* MRN No */}
        <TextField.Root
          placeholder="MRN No."
          className="w-40 border border-gray-200 rounded-md"
        />

        {/* From Date */}
        <TextField.Root className="w-40 border border-gray-200 rounded-md px-2">
          <input
            type="date"
            className="w-full bg-transparent outline-none text-sm"
          />
          <TextField.Slot side="right" />
        </TextField.Root>

        {/* To Date */}
        <TextField.Root className="w-40 border border-gray-200 rounded-md px-2">
          <input
            type="date"
            className="w-full bg-transparent outline-none text-sm"
          />
          <TextField.Slot side="right" />
        </TextField.Root>

        {/* Location Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="soft">Location ▼</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white rounded shadow">
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Location 1</DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Location 2</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Store Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="soft">Store ▼</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white rounded shadow">
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Store 1</DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Store 2</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Status Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="soft">Status ▼</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white rounded shadow">
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Open</DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Closed</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Box>
  );
}
