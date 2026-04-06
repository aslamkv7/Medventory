"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function EditRequestModal({ open, onOpenChange, rowData, onSave, title }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-white shadow-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-2">
            <Dialog.Title className="text-sm font-medium text-white">
              {title || `Edit Row #${rowData?.slNo}`}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded p-1 text-white/80 hover:bg-white/20">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updated = Object.fromEntries(formData.entries());
              onSave(updated);
              onOpenChange(false);
            }}
            className="p-5 text-sm space-y-4"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Item Code *" name="itemCode" defaultValue={rowData?.itemCode} />
              <InputField label="Item Description *" name="itemDesc" defaultValue={rowData?.itemName} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-4">
              <SelectField label="Item Type *" name="itemType" defaultValue={rowData?.itemType} options={["Raw", "Finished"]} />
              <SelectField label="UOM *" name="uom" defaultValue={rowData?.uom} options={["NUM", "KG"]} />
              <InputField label="Required Qty *" name="reqQty" type="number" defaultValue={rowData?.reqQty} />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-4">
              <InputField label="Approved Qty" name="apprQty" type="number" defaultValue={rowData?.apprQty} />
              <InputField label="Issued Qty" name="issuedQty" type="number" defaultValue={rowData?.issuedQty} />
              <InputField label="Received Qty" name="recQty" type="number" defaultValue={rowData?.recQty} />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Rejected Qty" name="rejQty" type="number" defaultValue={rowData?.rejQty} />
              <InputField label="Balance Qty" name="balQty" type="number" defaultValue={rowData?.balQty} />
            </div>

            {/* Row 5 - Remarks */}
            <div>
              <label className="block text-gray-700 mb-1">Remarks</label>
              <textarea
                name="remarks"
                defaultValue={rowData?.remarks}
                rows={3}
                className="w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-1.5 text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* 🔹 Shared Input Components */
function InputField({ label, name, defaultValue, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
}

function SelectField({ label, name, defaultValue, options }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option value="">Choose</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
