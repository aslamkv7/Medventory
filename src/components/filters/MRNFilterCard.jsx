"use client";

import { Label } from "@radix-ui/react-label";
import { TextField } from "@radix-ui/themes";

export default function MRNFilterCard({ data }) {
  // data will look like:
  // {
  //   issueNo: "IS-0000481",
  //   dateTime: "24-Feb-2025 18:17:01",
  //   requestedLocation: "7027 (Echo) - Inventory",
  //   issuedInStore: "Inventory Main Store",
  //   mrnStatus: "Received"
  // }

  return (
    <div className="grid grid-cols-5 gap-4 bg-white rounded-t-md shadow p-4">
      {/* Issue No */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-gray-600">Issue No.</Label>
        <TextField.Root readOnly value={data.issueNo} />
      </div>

      {/* Date/Time */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-gray-600">Date/Time</Label>
        <TextField.Root readOnly value={data.dateTime} />
      </div>

      {/* Requested Location */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-gray-600">Requested Location</Label>
        <TextField.Root readOnly value={data.requestedLocation} />
      </div>

      {/* Issued in Store */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-gray-600">Issued in Store</Label>
        <TextField.Root readOnly value={data.issuedInStore} />
      </div>

      {/* MRN Status */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-gray-600">MRN Status</Label>
        <TextField.Root readOnly value={data.mrnStatus} />
      </div>
    </div>
  );
}
