"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import PaginationControls from "../../components/PaginationControls";
import Filter from "../../components/filters/Filter";
import MRNTable from "../../components/tables/MRNTable";
import { fetchMRN } from "../../services/mrnServices";

const PAGE_SIZE = 10;

const defaultFilters = {
  issueNo: "",
  mrnId: "",
  fromDate: "",
  toDate: "",
  location: "",
  store: "",
  status: "",
};

function matchesFilters(row, searchText, filters) {
  const query = searchText.trim().toLowerCase();
  if (query) {
    const haystack = [
      row.issueNo,
      row.mrnId,
      row.location,
      row.store,
      row.requestedBy,
      row.approvedBy,
      row.issuedBy,
      row.mrnStatus,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(query)) return false;
  }

  if (filters.issueNo && !String(row.issueNo || "").toLowerCase().includes(filters.issueNo.toLowerCase())) {
    return false;
  }

  if (filters.mrnId && !String(row.mrnId || "").toLowerCase().includes(filters.mrnId.toLowerCase())) {
    return false;
  }

  const rowDate = row.requesterDate || row.date || "";
  if (filters.fromDate && rowDate && rowDate < filters.fromDate) return false;
  if (filters.toDate && rowDate && rowDate > filters.toDate) return false;

  if (filters.location && row.location !== filters.location) return false;
  if (filters.store && row.store !== filters.store) return false;

  if (filters.status) {
    const statusText = `${row.status || ""} ${row.issuedStatus || ""} ${row.mrnStatus || ""}`.toLowerCase();
    if (!statusText.includes(filters.status.toLowerCase())) return false;
  }

  return true;
}

export default function MRNPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function loadAllMrn() {
      setLoading(true);
      try {
        const result = await fetchMRN(0, 1000);
        if (!isMounted) return;
        setAllRows(Array.isArray(result?.rows) ? result.rows : []);
      } catch {
        if (!isMounted) return;
        setAllRows([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAllMrn();

    return () => {
      isMounted = false;
    };
  }, []);

  const locationOptions = useMemo(
    () => Array.from(new Set(allRows.map((row) => row.location).filter(Boolean))).sort(),
    [allRows]
  );

  const storeOptions = useMemo(
    () => Array.from(new Set(allRows.map((row) => row.store).filter(Boolean))).sort(),
    [allRows]
  );

  const statusOptions = useMemo(
    () => Array.from(new Set(allRows.map((row) => row.mrnStatus).filter(Boolean))).sort(),
    [allRows]
  );

  const filteredRows = useMemo(
    () => allRows.filter((row) => matchesFilters(row, searchText, filters)),
    [allRows, searchText, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const visibleRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page]);

  return (
    <div className="bg-gray-100 pt-6 pr-6 pl-6">
      <Box className="bg-white rounded-sm shadow p-3 px-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold w-max">Stock Receive</h1>
          <button
            onClick={() => router.push("/stock-receive/add-item")}
            className="bg-blue-500 text-white px-6 py-1 rounded font-medium hover:bg-blue-400 transition"
          >
            Add
          </button>
        </div>
        <hr className="mt-3 border-gray-300" />

        <div className="flex items-center justify-between mt-3">
          <TextField.Root
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            placeholder="Search the docs..."
            className="flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 w-64 sm:w-80 md:w-96 max-w-full"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </Box>

      <Box height="auto" className="bg-white rounded-sm shadow p-4 mt-2">
        <Filter
          value={filters}
          onChange={(next) => {
            setFilters(next);
            setPage(1);
          }}
          locationOptions={locationOptions}
          storeOptions={storeOptions}
          statusOptions={statusOptions}
        />
        <MRNTable rows={visibleRows} loading={loading} />
        <div className="m-3">
          <h3 className="font-bold my-1">Color Indication</h3>
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
