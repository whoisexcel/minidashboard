import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import DebouncedInput from "../utils/DebouncedInput";

const Table = ({ data, onEdit, onDelete }: any) => {
  const [sortBy, setSortBy] = useState<"name" | "email" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState(""); // Keep search state

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  const handleSort = (column: "name" | "email") => {
    setSortBy(column);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="overflow-x-auto">
      {/* Use DebouncedInput instead of the normal input */}
      <div className="mb-3">
      <DebouncedInput
        value={search}
        onChange={setSearch} // This will update the search state
        placeholder="Search by name"
      />
      </div>
      <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th
              className="p-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("name")}
            >
              Name
              {sortBy === "name" && (sortOrder === "asc" ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              {sortBy !== "name" && <FaSort className="inline ml-2" />}
            </th>
            <th
              className="p-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("email")}
            >
              Email
              {sortBy === "email" && (sortOrder === "asc" ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              {sortBy !== "email" && <FaSort className="inline ml-2" />}
            </th>
            <th className="p-3 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user: any) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3 text-sm font-medium text-gray-700">{user.name}</td>
              <td className="p-3 text-sm font-medium text-gray-700">{user.email}</td>
              <td className="p-3 text-sm font-medium text-gray-700">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="ml-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;