"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // ✅ import hooks
import GenericTable from "./GenericTable";
import { Eye } from "lucide-react";
import { fetchMRN } from "../../services/mrnServices"; // adjust path if needed

export default function MRNTable({page}) {
  const [mrnData, setMrnData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
// Define your columns outside the component
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
        onClick={() => router.push(`/mrn/${row.mrnId}`)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Eye className="w-4 h-4 text-blue-500" />
      </button>
    ),
  },
];

  useEffect(() => {
    async function fetchData() { // ✅ log MRN ID

      try {
        const data = await fetchMRN((page-1) * 10, 10);
        console.log("MRN fetched:", data); // ✅ log returned data
        setMrnData(data); // wrap in array for GenericTable
      } catch (err) {
        console.error("Error fetching MRN:", err); // ✅ log error
        setMrnData([]);
      } finally {
        setLoading(false); // ✅ stops the loading spinner
      }
    }

    fetchData();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (!mrnData.length) return <div>No MRN data found.</div>;

  return <GenericTable columns={mrnColumns} data={mrnData} />;
}