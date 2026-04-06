"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import MRNFilterCard from "../../../components/filters/MRNFilterCard";
import ItemsTable from "../../../components/tables/ItemsTable";
import { fetchMRNById } from "../../../services/mrnServices";

function toCardData(mrn) {
  return {
    issueNo: mrn?.issueNo || "-",
    dateTime: [mrn?.date, mrn?.time].filter(Boolean).join(" ") || "-",
    requestedLocation: mrn?.requestedLocation || "-",
    issuedInStore: mrn?.issuedInStore || "-",
    mrnStatus: mrn?.mrnStatus || "-",
  };
}

function createActivityEntry(text) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label: `${new Date().toLocaleString()} - ${text}`,
  };
}

export default function MRNDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [mrnMeta, setMrnMeta] = useState(null);
  const [tableActions, setTableActions] = useState(null);
  const [activity, setActivity] = useState([]);

  const mrnId = useMemo(() => {
    const value = params?.mrnId;
    return Array.isArray(value) ? value[0] : value;
  }, [params]);

  const addActivity = useCallback((text) => {
    setActivity((prev) => [createActivityEntry(text), ...prev].slice(0, 5));
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMrn() {
      if (!mrnId) return;

      try {
        const data = await fetchMRNById(mrnId);
        if (isMounted) setMrnMeta(data);
      } catch {
        if (isMounted) setMrnMeta(null);
      }
    }

    loadMrn();

    return () => {
      isMounted = false;
    };
  }, [mrnId]);

  const handleReceiveStock = () => {
    if (!tableActions?.receiveStock) return;
    tableActions.receiveStock();
    setMrnMeta((prev) => (prev ? { ...prev, mrnStatus: "Received", issuedStatus: "Received" } : prev));
    addActivity("Receive Stock applied to all rows");
  };

  const handleSubmit = () => {
    if (!tableActions?.submitChanges) return;
    const saved = tableActions.submitChanges();
    if (saved) {
      addActivity("Changes submitted and saved locally");
    }
  };

  const handleAddRow = () => {
    if (!tableActions?.addRow) return;
    tableActions.addRow();
    addActivity("Opened add-row form");
  };

  const handleDelete = () => {
    if (!tableActions?.deleteRow) return;
    const deleted = tableActions.deleteRow();
    addActivity(deleted ? "Deleted selected item row" : "Select a row to delete");
  };

  return (
    <div className="bg-gray-100 pt-6 pr-6 pl-6">
      <Box className="bg-white rounded-sm shadow p-1 py-2">
        <div className="flex justify-between p-2 px-4 items-center">
          <div className="flex justify-start gap-1">
            <button
              onClick={() => router.back()}
              className="flex items-center rounded-md hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold w-max">Stock Receive</h1>
          </div>

          <div className="flex justify-end gap-2">
            <button className="px-3 py-1 rounded font-medium border border-gray-400 hover:bg-grey-400 transition">
              ...
            </button>

            <button
              onClick={handleReceiveStock}
              className="bg-blue-500 text-white px-6 py-1 rounded font-medium text-sm hover:bg-blue-400 transition"
            >
              Receive Stock
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-1 rounded font-medium text-sm hover:bg-blue-400 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </Box>
      <hr className="mt-2 border-gray-100" />

      <div className="bg-white rounded-sm shadow p-4 space-y-4">
        <MRNFilterCard data={toCardData(mrnMeta)} />

        {mrnId ? (
          <ItemsTable mrnId={mrnId} onActionsReady={setTableActions} />
        ) : (
          <div>Loading...</div>
        )}

        <div className="m-3 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={handleAddRow}
              className="px-3 py-2 border border-gray-400 rounded-md text-sm font-medium bg-white hover:bg-gray-100 transition"
            >
              Add Row
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>

          <div className="m-3">
            <h3 className="font-bold my-1">Color Indication</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 bg-orange-300 border border-gray-400" />
                <span className="text-sm font-medium">Item Not Received</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 bg-blue-300 border border-gray-400" />
                <span className="text-sm font-medium">
                  Item Added From Issue Screen
                </span>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-md">Activity</h3>
          <div className="text-sm text-gray-600 space-y-1">
            {activity.length ? activity.map((entry) => <p key={entry.id}>{entry.label}</p>) : <p>No activity yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
