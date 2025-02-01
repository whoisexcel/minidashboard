import { useState, useEffect } from "react";
import { useFetchData, useDeleteData, useEditData, usePostData } from "../hooks/useApi";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { User, NewUser } from "../types/user";

const Dashboard = () => {
  const { data: fetchedData, isLoading, error } = useFetchData<User[]>("users");
  const deleteMutation = useDeleteData();
  const editMutation = useEditData<User>();
  const postMutation = usePostData<NewUser>();

  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedData) {
      setUsers(fetchedData);
    }
  }, [fetchedData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate({ endpoint: "users", id });
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleView = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handleModalSave = (userData: { name: string; email: string }) => {
    if (editingUser) {
      editMutation.mutate({
        endpoint: "users",
        id: editingUser.id,
        data: { id: editingUser.id, ...userData },
      });
      setUsers(prev =>
        prev.map(u => (u.id === editingUser.id ? { id: editingUser.id, ...userData } : u))
      );
    } else {
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      postMutation.mutate({
        endpoint: "users",
        data: userData,
      });
      setUsers(prev => [...prev, { id: newId, ...userData }]);
    }
    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-4 w-full">
        <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setModalOpen(true);
          }}
          className="mb-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition"
        >
          Create New User
        </button>
        <Table data={users} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleModalSave}
          initialData={editingUser || undefined}
        />
      </div>
    </div>
  );
};

export default Dashboard;
