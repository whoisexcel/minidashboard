import React, { useState, useMemo } from 'react';

interface TableProps {
  data: any[];
  onSort: (column: string) => void;
  sortBy: string;
}

const Table: React.FC<TableProps> = ({ data, onSort, sortBy }) => {
  const columns = useMemo(() => ["name", "email", "username"], []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => onSort(col)}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                {sortBy === col && " 🔼"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
