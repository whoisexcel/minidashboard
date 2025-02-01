import { useState } from "react";
import { useFetchData } from "../hooks/useApi";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading } = useFetchData<{ id: number; name: string; email: string }[]>("users");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Added rowsPerPage state
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage); // Update totalPages calculation
  const paginatedData = data?.slice((page - 1) * rowsPerPage, page * rowsPerPage) || [];
  
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-4 w-full">
        <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
        <Table
          data={paginatedData}
          onEdit={(user) => console.log("Edit", user)}
          onDelete={(id) => console.log("Delete", id)}
          onView={(user) => navigate(`/users/${user.id}`)}
        />
        {/* <Pagination
          page={page}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={handleRowsPerPageChange} // Pass the new function
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
