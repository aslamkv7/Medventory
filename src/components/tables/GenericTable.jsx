"use client";

function resolveRowKey(row, rowIndex, rowKey) {
  if (typeof rowKey === "function") {
    return rowKey(row, rowIndex);
  }

  if (typeof rowKey === "string" && row?.[rowKey] != null) {
    return row[rowKey];
  }

  return row?.id ?? row?.mrnId ?? row?.slNo ?? rowIndex;
}

export default function GenericTable({
  columns,
  data,
  rowKey = "id",
  onRowClick,
  selectedRowId = null,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-300 text-sm w-max min-w-full">
        {/* Header */}
        <thead>
          <tr className="bg-blue-500 text-white">
            {columns.map((col, index) => (
              <th
                key={index}
                className="border px-6 py-3 text-left font-medium whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, rowIndex) => {
            const resolvedRowKey = resolveRowKey(row, rowIndex, rowKey);
            const isSelected =
              selectedRowId !== null &&
              selectedRowId !== undefined &&
              String(selectedRowId) === String(resolvedRowKey);
            const rowClass =
              row.status?.toLowerCase().includes("partially") ||
              row.issuedStatus?.toLowerCase().includes("partially")
                ? "bg-green-300"
                : "bg-white";
            const hoverClass = isSelected ? "hover:bg-blue-100" : "hover:bg-gray-50";
            const selectedClass = isSelected ? "bg-blue-100" : rowClass;

            return (
              <tr
                key={String(resolvedRowKey)}
                className={`${selectedClass} ${hoverClass} ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(row, resolvedRowKey)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-1 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
