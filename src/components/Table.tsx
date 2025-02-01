// src/components/Table.tsx
import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import DebouncedInput from "../utils/DebouncedInput";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface TableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onView: (user: User) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete, onView }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  
  const filteredData = useMemo(
    () =>
      data.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      ),
    [data, search]
  );

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valueA = String(a[sortBy]).toLowerCase();
      const valueB = String(b[sortBy]).toLowerCase();
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [filteredData, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const displayedData = useMemo(
    () => sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(1);
  };
  const handleSort = (column: keyof User) => {
    setSortBy(column);
    setSortOrder(sortBy === column && sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white p-4">
        <DebouncedInput
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
        />
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              {["sn", "name", "email"].map((key) => (
                <th
                  key={key}
                  className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort(key as keyof User)}
                >
                  {key.toUpperCase()} {sortBy === key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{user.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => onView(user)}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md transition"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default Table;
