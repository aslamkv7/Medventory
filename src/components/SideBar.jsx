"use client";

import { Box } from "@radix-ui/themes";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import InventoryDropdown from "./inventory/InventoryDropdown";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openInventorySignal, setOpenInventorySignal] = useState(0);
  const [pendingInventoryOpen, setPendingInventoryOpen] = useState(false);

  const handleInventoryTap = () => {
    if (collapsed) {
      setPendingInventoryOpen(true);
      setCollapsed(false);
    }
  };

  return (
    <Box
      onTransitionEnd={(event) => {
        if (
          event.propertyName === "width" &&
          pendingInventoryOpen &&
          !collapsed
        ) {
          setOpenInventorySignal((prev) => prev + 1);
          setPendingInventoryOpen(false);
        }
      }}
      className={`min-h-screen overflow-hidden bg-blue-500 py-3 transition-[width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed ? "w-[84px] px-2" : "w-[280px] px-6"
      }`}
    >
      <div className={`mb-1 flex ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded p-1 text-white transition-colors duration-200 hover:bg-blue-400"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
          ) : (
            <PanelLeftClose className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </div>

      <Link
        href="/"
        className={`my-4 flex flex-row rounded px-1 py-1 transition-colors duration-200 hover:bg-blue-400 ${
          collapsed ? "justify-center" : "items-center gap-2"
        }`}
        title="Home"
      >
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 15 15"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
          />
        </svg>
        <h1
          className={`text-white text-sm font-semibold transition-all duration-300 ${
            collapsed ? "max-w-0 opacity-0" : "max-w-20 opacity-100"
          } overflow-hidden whitespace-nowrap`}
        >
          Home
        </h1>
      </Link>

      <InventoryDropdown
        collapsed={collapsed}
        onRequestExpand={handleInventoryTap}
        openAfterExpandSignal={openInventorySignal}
      />
    </Box>
  );
}
