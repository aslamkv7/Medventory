"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { Checkbox, Flex, Text } from "@radix-ui/themes";
import { fetchMRNById } from "../../services/mrnServices";
import GenericTable from "./GenericTable";
import ItemHistoryModal from "../modals/ItemHistoryModal";
import EditRequestModal from "../modals/EditRequestModal";
import BatchInfoModal from "../modals/BatchInfoModal";

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function makeRowId() {
  return `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeUpdatedRow(existingRow, updated) {
  const nextReq = toNumber(updated.reqQty);
  const nextAppr = toNumber(updated.apprQty);
  const nextIssued = toNumber(updated.issuedQty);
  const nextRec = toNumber(updated.recQty);
  const nextRej = toNumber(updated.rejQty);
  const fallbackBal = Math.max(0, (nextAppr || nextReq) - (nextRec + nextRej));

  return {
    ...existingRow,
    itemCode: updated.itemCode,
    itemName: updated.itemDesc,
    itemType: updated.itemType,
    uom: updated.uom,
    reqQty: nextReq,
    apprQty: nextAppr,
    issuedQty: nextIssued,
    recQty: nextRec,
    rejQty: nextRej,
    balQty: toNumber(updated.balQty) || fallbackBal,
    remarks: updated.remarks || "",
  };
}

function nextItemCode(rows, nextSlNo) {
  const rowWithMaxSlNo = rows.reduce(
    (best, row) => (toNumber(row.slNo) > toNumber(best?.slNo) ? row : best),
    null
  );

  const previousCode = String(rowWithMaxSlNo?.itemCode || "").trim();
  const match = previousCode.match(/^(.*?)(\d+)$/);

  if (match) {
    const prefix = match[1];
    const numberPart = match[2];
    const nextNumber = String(toNumber(numberPart) + 1).padStart(numberPart.length, "0");
    return `${prefix}${nextNumber}`;
  }

  return `ITEM${String(nextSlNo).padStart(3, "0")}`;
}

function createNewRowTemplate(rows) {
  const maxSlNo = rows.reduce((acc, row) => Math.max(acc, toNumber(row.slNo)), 0);
  const nextSlNo = maxSlNo + 1;

  return {
    id: makeRowId(),
    slNo: nextSlNo,
    itemCode: nextItemCode(rows, nextSlNo),
    itemName: "",
    itemType: "",
    uom: "NUM",
    reqQty: 0,
    apprQty: 0,
    issuedQty: 0,
    recQty: 0,
    rejQty: 0,
    balQty: 0,
    remarks: "",
    urgReq: false,
  };
}

function getRowId(row) {
  return row?.id ?? `sl-${toNumber(row?.slNo)}`;
}

export default function ItemsTable({ mrnId, onActionsReady }) {
  const [mrnData, setMrnData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openHistory, setOpenHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editorMode, setEditorMode] = useState("edit");
  const [editorRow, setEditorRow] = useState(null);
  const [openBatch, setOpenBatch] = useState(false);
  const [batchData, setBatchData] = useState([]);

  const draftKey = useMemo(() => (mrnId ? `mrn-draft-${mrnId}` : null), [mrnId]);

  useEffect(() => {
    if (!mrnId) {
      setMrnData([]);
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        if (typeof window !== "undefined" && draftKey) {
          const saved = window.localStorage.getItem(draftKey);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed?.items)) {
              if (isMounted) setMrnData(parsed.items);
              return;
            }
          }
        }

        const data = await fetchMRNById(mrnId);
        if (isMounted) setMrnData(data.items || []);
      } catch {
        if (isMounted) setMrnData([]);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [mrnId, draftKey]);

  const addRow = useCallback(() => {
    const template = createNewRowTemplate(mrnData);
    setEditorMode("add");
    setEditorRow(template);
    setOpenEditor(true);
  }, [mrnData]);

  const deleteRow = useCallback(() => {
    if (selectedRowId === null || selectedRowId === undefined) return false;

    let deleted = false;

    setMrnData((prev) => {
      const next = prev.filter((row) => String(getRowId(row)) !== String(selectedRowId));
      deleted = next.length !== prev.length;
      return deleted ? next : prev;
    });

    if (deleted) {
      setSelectedRowId(null);
    }

    return deleted;
  }, [selectedRowId]);

  useEffect(() => {
    if (selectedRowId === null || selectedRowId === undefined) return;

    const exists = mrnData.some((row) => String(getRowId(row)) === String(selectedRowId));
    if (!exists) {
      setSelectedRowId(null);
    }
  }, [mrnData, selectedRowId]);

  const receiveStock = useCallback(() => {
    setMrnData((prev) =>
      prev.map((row) => {
        const issuedQty = toNumber(row.issuedQty);
        const approvedQty = toNumber(row.apprQty || row.reqQty);
        const receivedQty = issuedQty;
        const rejectedQty = 0;
        const balanceQty = Math.max(0, approvedQty - receivedQty);

        return {
          ...row,
          recQty: receivedQty,
          rejQty: rejectedQty,
          balQty: balanceQty,
          remarks: row.remarks || "Received from stock action",
        };
      })
    );
  }, []);

  const submitChanges = useCallback(() => {
    if (!draftKey || typeof window === "undefined") return false;

    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        mrnId,
        submittedAt: new Date().toISOString(),
        items: mrnData,
      })
    );

    return true;
  }, [draftKey, mrnData, mrnId]);

  useEffect(() => {
    if (!onActionsReady) return;

    onActionsReady({
      addRow,
      deleteRow,
      receiveStock,
      submitChanges,
      hasRows: mrnData.length > 0,
    });

    return () => onActionsReady(null);
  }, [addRow, deleteRow, receiveStock, submitChanges, mrnData.length, onActionsReady]);

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
    {
      header: "Urgent Request",
      render: (row) => (
        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox checked={Boolean(row.urgReq)} />
          </Flex>
        </Text>
      ),
    },
    {
      header: "Batch Info",
      render: (row) => (
        <button
          onClick={() => {
            setSelectedRowId(getRowId(row));
            setBatchData([
              {
                batchNo: `BATCH-${row.slNo || 1}`,
                expDate: "2027-12-31",
                sellingPrice: "150.00",
                unitCost: "120.00",
                mrp: "200.00",
                createdDate: "2026-03-10",
                issuedQty: row.issuedQty || 0,
                recvQty: row.recQty || 0,
                netReceived: toNumber(row.recQty) - toNumber(row.rejQty),
                remark: row.remarks || "",
              },
            ]);
            setOpenBatch(true);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Eye className="w-4 h-4 text-blue-500" />
        </button>
      ),
    },
    {
      header: "Item History",
      render: (row) => (
        <button
          onClick={() => {
            setSelectedRowId(getRowId(row));
            setHistoryData([
              {
                itemName: row.itemName,
                batch: row.slNo || "N/A",
                qty: row.recQty || 0,
                dateTime: "2026-03-10 10:00",
                requestedUser: "Current User",
              },
            ]);
            setOpenHistory(true);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Eye className="w-4 h-4 text-green-500" />
        </button>
      ),
    },
    {
      header: <Pencil className="w-4 h-4 text-gray-600" />,
      render: (row) => (
        <button
          onClick={() => {
            setSelectedRowId(getRowId(row));
            setEditorMode("edit");
            setEditorRow(row);
            setOpenEditor(true);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Pencil className="w-4 h-4 text-blue-500" />
        </button>
      ),
    },
  ];

  return (
    <div className="px-4 bg-white">
      <GenericTable
        columns={itemsTable}
        data={mrnData}
        selectedRowId={selectedRowId}
        onRowClick={(row) => setSelectedRowId(getRowId(row))}
        rowKey={getRowId}
      />

      <BatchInfoModal open={openBatch} onOpenChange={setOpenBatch} batches={batchData} />

      <ItemHistoryModal
        open={openHistory}
        onOpenChange={setOpenHistory}
        history={historyData}
      />

      <EditRequestModal
        open={openEditor}
        onOpenChange={setOpenEditor}
        rowData={editorRow}
        title={editorMode === "add" ? `Add Row #${editorRow?.slNo}` : undefined}
        onSave={(updated) => {
          if (!editorRow) return;

          if (editorMode === "add") {
            const createdRow = normalizeUpdatedRow(editorRow, updated);
            setMrnData((prev) => [...prev, createdRow]);
            setSelectedRowId(getRowId(createdRow));
            return;
          }

          setMrnData((prev) =>
            prev.map((row) =>
              String(getRowId(row)) === String(getRowId(editorRow))
                ? normalizeUpdatedRow(row, updated)
                : row
            )
          );
        }}
      />
    </div>
  );
}
