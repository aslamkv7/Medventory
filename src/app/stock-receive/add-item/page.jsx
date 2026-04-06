"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import MRNFilterCard from "../../../components/filters/MRNFilterCard";
import ItemsTable from "../../../components/tables/ItemsTable";
import { fetchMRN, fetchMRNById } from "../../../services/mrnServices";

function toCardData(mrn) {
  return {
    issueNo: mrn?.issueNo || "-",
    dateTime: [mrn?.date, mrn?.time].filter(Boolean).join(" ") || "-",
    requestedLocation: mrn?.requestedLocation || "-",
    issuedInStore: mrn?.issuedInStore || "-",
    mrnStatus: mrn?.mrnStatus || "-",
  };
}

export default function AddNewItem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mrnMeta, setMrnMeta] = useState(null);

  const requestedMrnId = useMemo(() => searchParams.get("mrnId"), [searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadMrn() {
      try {
        if (requestedMrnId) {
          const byId = await fetchMRNById(requestedMrnId);
          if (isMounted) setMrnMeta(byId);
          return;
        }

        const firstPage = await fetchMRN(0, 1);
        const firstMrn = Array.isArray(firstPage?.rows) ? firstPage.rows[0] : null;
        if (isMounted) setMrnMeta(firstMrn || null);
      } catch {
        if (isMounted) setMrnMeta(null);
      }
    }

    loadMrn();

    return () => {
      isMounted = false;
    };
  }, [requestedMrnId]);

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
            <button className="bg-blue-500 text-white px-6 py-1 rounded font-medium text-sm hover:bg-blue-400 transition">
              Print
            </button>
          </div>
        </div>
      </Box>
      <hr className="mt-2 border-gray-100" />

      <div className="bg-white rounded-sm shadow p-4 space-y-4">
        <MRNFilterCard data={toCardData(mrnMeta)} />

        {mrnMeta?.mrnId ? <ItemsTable mrnId={mrnMeta.mrnId} /> : <div>Loading...</div>}

        <div className="m-3">
          <h3 className="font-bold my-1">Color Indication</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 bg-orange-200 border border-gray-400" />
              <span className="text-sm font-medium">Item Not Received</span>
            </div>
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 bg-blue-300 border border-gray-400" />
              <span className="text-sm font-medium">Item Added From Issue Screen</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-md">Activity</h3>
      </div>
    </div>
  );
}
