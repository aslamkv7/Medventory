'use client'

import { Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import PaginationControls from "@/components/PaginationControls";
import Filter from "@/components/filters/Filter";
import MRNTable from "@/components/tables/MRNTable";
import { useState } from "react";

export default function MRNPage() {
  const [page, setPage] = useState(1);

  return (
    <div
      className="bg-gray-100 pt-6 pr-6 pl-6"
      style={{ width: "calc(100% - 16rem)" }}
    >
      <Box className="bg-white rounded-sm shadow p-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold w-max">Stock Receive</h1>
          <button className="bg-blue-500 text-white px-6 py-1 rounded font-medium hover:bg-blue-400 transition">
            Add
          </button>
        </div>
        <hr className="mt-3 border-gray-300" />

        {/* Search + Pagination */}
        <div className="flex items-center justify-between mt-3">
          <TextField.Root
            placeholder="Search the docs…"
            className="flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 w-64 sm:w-80 md:w-96 max-w-full"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <PaginationControls page={page} setPage={setPage} />
        </div>
      </Box>
      <Box height="auto" className="bg-white rounded-sm shadow p-4 mt-2">
        <Filter />
        <MRNTable page={page} />
        <div className="m-3">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 bg-green-300 border border-gray-400" />
                <span className="text-sm font-medium">Rejected Items Color</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 bg-blue-300 border border-gray-400" />
                <span className="text-sm font-medium">Auto Received Items</span>
              </div>
            </div>
        </div>
      </Box>
    </div>
  );
}
