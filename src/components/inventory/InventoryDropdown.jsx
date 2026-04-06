"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InventoryDropdown({
  collapsed = false,
  onRequestExpand,
  openAfterExpandSignal = 0,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (collapsed) {
      setOpen(false);
    }
  }, [collapsed]);

  useEffect(() => {
    if (!collapsed && openAfterExpandSignal > 0) {
      setOpen(true);
    }
  }, [collapsed, openAfterExpandSignal]);

  if (collapsed) {
    return (
      <button
        type="button"
        title="Inventory Management"
        onClick={onRequestExpand}
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-white text-blue-500 cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <Boxes className="h-5 w-5" />
      </button>
    );
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          title="Inventory Management"
          className="h-16 w-full bg-white text-blue-500 flex items-center justify-between text-left text-sm font-semibold px-6 rounded-sm cursor-pointer transition-shadow duration-200 hover:shadow-sm"
        >
          <span>Inventory Management</span>
          <ChevronDownIcon
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex flex-col mt-1 text-white"
          sideOffset={5}
          align="center"
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
              Stock Receive {" >"}
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
