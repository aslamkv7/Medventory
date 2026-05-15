"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Raise Requisition" },
  { label: "Issue Requisition" },
  { label: "Direct Issue" },
  { label: "Stock Receive", href: "/stock-receive", suffix: ">" },
  { label: "Revert In-Transit Stock" },
  { label: "Location Stock Consumption" },
  { label: "Consignment Stock Manage" },
  { label: "Consignment Stock Return" },
  { label: "Item Request" },
];

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
    <nav className="w-full" aria-label="Inventory navigation">
      <button
        type="button"
        title="Inventory Management"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-sm bg-white px-4 text-left text-sm font-semibold text-blue-500 transition-shadow duration-200 hover:shadow-sm md:h-16 md:px-6"
      >
        <span className="truncate">Inventory Management</span>
        <ChevronDownIcon
          className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${
          open ? "mt-3 max-h-[520px] opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 flex flex-col gap-1 border-l border-white/30 pl-3 text-white md:ml-5 md:pl-4">
          {menuItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded px-3 py-2 text-sm font-medium leading-snug transition-colors hover:bg-white hover:text-blue-600"
              >
                {item.label} {item.suffix}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className="rounded px-3 py-2 text-left text-sm font-medium leading-snug transition-colors hover:bg-white hover:text-blue-600"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
