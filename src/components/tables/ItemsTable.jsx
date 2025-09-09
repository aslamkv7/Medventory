import { fetchMRNById } from "@/services/mrnServices";
import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import GenericTable from "./GenericTable";

const itemsTable = [
  { header: "Sl No", accessor: "slNo" },
  { header: "Item Code", accessor: "itemCode" },
  { header: "Item Name", accessor: "itemName" },
  { header: "UOM", accessor: "uom" },
  { header: "Requested Qty", accessor: "reqQty" },
  { header: "Approved Qty", accessor: "apprQty" },
  { header: "Issued Qty", accessor: "issuedQty" },
  { header: "Received Qty", accessor: "recQty" },
  { header: "Rejected Qty", accessor: "rejQty" },
  { header: "Balance Qty", accessor: "balQty" },
  { header: "Remarks", accessor: "remarks" },
  { header: "Urgent Request", accessor: "urgReq" },
  { header: "Color Indication", accessor: "colorIndication" },

  // Batch Info
  {
    header: "Batch Info",
    render: (row) => (
      <button
        onClick={() => console.log("Batch Info for:", row.itemCode)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Eye className="w-4 h-4 text-blue-500" />
      </button>
    ),
  },

  // Item History
  {
    header: "Item History",
    render: (row) => (
      <button
        onClick={() => console.log("Item History for:", row.itemCode)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Eye className="w-4 h-4 text-green-500" />
      </button>
    ),
  },

  // Edit Column with Pencil
  {
    header: (
      <Pencil className="w-4 h-4 text-gray-600" />
    ),
    render: (row) => (
      <button
        onClick={() => console.log("Edit item:", row.itemCode)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Pencil className="w-4 h-4 text-blue-500" />
      </button>
    ),
  },
];


export default function ItemsTable({mrnId}) {
  const [mrnData, setMrnData] = useState([]);

    useEffect(() => {
      async function fetchData() {
  
        try {
          const data = await fetchMRNById(mrnId);
          console.log("MRN fetched:", data); // ✅ log returned data
          setMrnData(data); // wrap in array for GenericTable
        } catch (err) {
          console.error("Error fetching MRN:", err); // ✅ log error
          setMrnData([]);
        }
      }
  
      fetchData();
    }, []);

  return (
     <GenericTable columns={itemsTable} data={mrnData} />
  )
}
