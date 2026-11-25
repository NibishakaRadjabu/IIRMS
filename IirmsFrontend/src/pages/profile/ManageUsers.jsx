// ManageUsers.js
import { useEffect, useState } from "react";
import api from "../../utils/axios"; // Axios instance with JWT interceptor

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from backend
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Confirmed</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="border p-2">{user.user_id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {user.is_confirmed ? "Yes" : "No"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {/* Future: Add Edit button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
