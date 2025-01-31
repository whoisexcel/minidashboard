import { useState } from "react";
import {useFetchData} from "../hooks/useFetchData";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

const Dashboard = () => {
  const { data, isLoading } = useFetchData<{
    id: number;
    name: string;
    email: string;
  }>("users");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  if (isLoading) return <p>Loading...</p>;

  const handleSave = (userData: {
    id: number;
    name: string;
    email: string;
  }) => {
    console.log("Saved Data", userData);
    setModalOpen(false); // Close modal after save
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
      <Table
        data={data || []}
        onEdit={(user: any) => {
          setEditUser(user);
          setModalOpen(true);
        }}
        onDelete={(id: any) => console.log("Delete", id)}
      />
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={(p) => console.log("Page change", p)}
      />
      <button
        onClick={() => {
          setEditUser(null);
          setModalOpen(true);
        }}
        className="mt-4 bg-green-500 text-white px-4 py-2"
      >
        Add User
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editUser || undefined}
      />
    </div>
  );
};

export default Dashboard;
