import React from "react";

function SummaryTable({ data }) {

  const isEmpty = !data || Object.keys(data).length === 0;

  return (
    <table className="min-w-full border border-gray-300 shadow-md bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 text-left">Element Type</th>
          <th className="border p-2 text-left">Count</th>
        </tr>
      </thead>
      <tbody>
        {isEmpty ? (
          <tr>
            <td colSpan="2" className="text-center p-4 text-gray-500">
              No records found
            </td>
          </tr>
        ) : (
          Object.entries(data).map(([type, count]) => (
            <tr key={type} className="border-t">
              <td className="border p-2">{type}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

}

export default SummaryTable;