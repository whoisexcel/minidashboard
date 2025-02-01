import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useApi";
import Sidebar from "../components/Sidebar";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useFetchData<{
    id: number;
    name: string;
    email: string;
  }>(`users/${id}`);
  const { data: posts, isLoading: postsLoading } = useFetchData<
    { id: number; title: string; body: string }[]
  >(`users/${id}/posts`);

  if (isLoading || postsLoading) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-4">
        <h1 className="text-xl font-bold">User Details</h1>
        <p>
          <strong>ID:</strong> {user?.id || "loading"}
        </p>
        <p>
          <strong>Name:</strong> {user?.name || "loading"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "loading"}
        </p>

        <h2 className="text-lg font-bold mt-4">Posts</h2>
        {posts && posts.length > 0 ? (
          <ul className="list-disc pl-6">
            {posts.map((post) => (
              <li key={post.id} className="mt-2">
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
