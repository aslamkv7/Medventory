"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function InventoryDropdown() {
  return (
    <DropdownMenu.Root>
      {/* Trigger */}
      <DropdownMenu.Trigger asChild>
        <button className="w-45 h-16 bg-white text-blue-500 flex items-center justify-between text-left text-sm font-semibold px-6 rounded-sm cursor-pointer">
          <span>Inventory Management</span>
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown content */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex flex-col mt-1 text-white"
          sideOffset={5}
        >
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Raise Requisition
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Issue Requisition
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Direct Issue
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/stock-receive"
              className="block px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none"
            >
              Stock Receive ➤
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Revert In-Transit Stock
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Location Stock Consumption
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Consignment Stock Manage
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Consignment Stock Return
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-6 py-2 font-medium text-sm rounded hover:bg-white hover:text-blue-600 cursor-pointer outline-none">
            Item Request
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
