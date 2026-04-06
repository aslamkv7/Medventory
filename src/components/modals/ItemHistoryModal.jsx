"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ItemHistoryModal({ open, onOpenChange, history }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay with blur */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[650px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Header with blue background */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
            <Dialog.Title className="text-lg font-semibold text-white">
              Item History
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded p-1 text-white/80 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Table */}
          <div className="max-h-[400px] overflow-y-auto p-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-3 py-2 font-medium">Item Name</th>
                  <th className="px-3 py-2 font-medium">Batch</th>
                  <th className="px-3 py-2 font-medium">Qty</th>
                  <th className="px-3 py-2 font-medium">Date/Time</th>
                  <th className="px-3 py-2 font-medium">Requested User</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-2">{row.itemName}</td>
                    <td className="px-3 py-2">{row.batch}</td>
                    <td className="px-3 py-2">{row.qty}</td>
                    <td className="px-3 py-2">{row.dateTime}</td>
                    <td className="px-3 py-2">{row.requestedUser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-4 bg-gray-50"/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
