"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import GenericTable from "./GenericTable";

export default function MRNTable({ rows, loading }) {
  const router = useRouter();

  const mrnColumns = [
    { header: "Issue No", accessor: "issueNo" },
    { header: "MRN ID", accessor: "mrnId" },
    { header: "Location", accessor: "location" },
    { header: "Store", accessor: "store" },
    { header: "Requester Date", accessor: "requesterDate" },
    { header: "Requested By", accessor: "requestedBy" },
    { header: "Approved Date", accessor: "approvedDate" },
    { header: "Approved By", accessor: "approvedBy" },
    { header: "Issued Date", accessor: "issuedDate" },
    { header: "Issued By", accessor: "issuedBy" },
    { header: "Received Date", accessor: "receivedDate" },
    { header: "Status", accessor: "status" },
    { header: "Issued Status", accessor: "issuedStatus" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Requested Location", accessor: "requestedLocation" },
    { header: "Issued In Store", accessor: "issuedInStore" },
    { header: "MRN Status", accessor: "mrnStatus" },
    {
      header: "View",
      render: (row) => (
        <button
          onClick={() => router.push(`/stock-receive/${row.mrnId}`)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Eye className="w-4 h-4 text-blue-500" />
        </button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (!rows.length) return <div>No MRN data found.</div>;

  return <GenericTable columns={mrnColumns} data={rows} />;
}
