import React from "react";

function DetailedTable({ data }) {

  const isEmpty = !data || data.length === 0;
  
  return (
    <table className="min-w-full border border-gray-300 shadow-md bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 text-left">Element Type</th>
          <th className="border p-2 text-left">Length</th>
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
          data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.type}</td>
              <td className="border p-2">{item.length}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

}

export default DetailedTable;