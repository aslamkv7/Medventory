"use client";

export default function GenericTable({ columns, data }) {
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
            const rowClass =
              row.status?.toLowerCase().includes("partially") ||
              row.issuedStatus?.toLowerCase().includes("partially")
                ? "bg-green-300"
                : "bg-white";

            return (
              <tr key={rowIndex} className={`${rowClass} hover:bg-gray-50`}>
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
