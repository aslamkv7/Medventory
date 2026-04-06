"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function BatchInfoModal({ open, onOpenChange, batches }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay with blur */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[700px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
            <Dialog.Title className="text-lg font-semibold text-white">
              Batch Information
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
                  <th className="px-3 py-2 font-medium">Batch No</th>
                  <th className="px-3 py-2 font-medium">Expiry Date</th>
                  <th className="px-3 py-2 font-medium">Selling Price</th>
                  <th className="px-3 py-2 font-medium">Unit Cost</th>
                  <th className="px-3 py-2 font-medium">MRP</th>
                  <th className="px-3 py-2 font-medium">Created Date</th>
                  <th className="px-3 py-2 font-medium">Issued Qty</th>
                  <th className="px-3 py-2 font-medium">Received Qty</th>
                  <th className="px-3 py-2 font-medium">Net Received</th>
                  <th className="px-3 py-2 font-medium">Remark</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2">{row.batchNo}</td>
                    <td className="px-3 py-2">{row.expDate}</td>
                    <td className="px-3 py-2">{row.sellingPrice}</td>
                    <td className="px-3 py-2">{row.unitCost}</td>
                    <td className="px-3 py-2">{row.mrp}</td>
                    <td className="px-3 py-2">{row.createdDate}</td>
                    <td className="px-3 py-2">{row.issuedQty}</td>
                    <td className="px-3 py-2">{row.recvQty}</td>
                    <td className="px-3 py-2">{row.netReceived}</td>
                    <td className="px-3 py-2">{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-4 bg-gray-50" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
