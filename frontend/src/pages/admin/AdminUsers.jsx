import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCalendarDays, FaTrash } from "react-icons/fa6";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/courses`,
        );

        // Naya Check: Dekho ke response waqai JSON hai ya nahi
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setCourses(Array.isArray(data) ? data : []);
        } else {
          console.warn(
            "Backend API not ready or returned HTML instead of JSON.",
          );
          setCourses([]); // Fallback empty array
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user account?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.ok) {
        setUsers(users.filter((u) => (u._id || u.id) !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Registered Users</h2>
          <p className="text-sm text-ink-500 mt-1">
            View and manage parents registered on ParentGenius
          </p>
        </div>
        <div className="bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-semibold">
          Total Users: {users.length}
        </div>
      </div>

      {loading ? (
        <p className="text-ink-500 py-8">Loading users data...</p>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-2xl ring-1 ring-ink-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-100 bg-brand-50/50 text-xs font-bold text-ink-700">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-sm">
              {users.map((u) => {
                const userId = u._id || u.id;
                // Format date if available, otherwise show fallback
                const joinedDate = u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                return (
                  <tr key={userId} className="hover:bg-brand-50/30">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {u.name ? (
                            u.name.charAt(0).toUpperCase()
                          ) : (
                            <FaUser size={12} />
                          )}
                        </div>
                        <span className="font-semibold text-ink-900">
                          {u.name || "Unknown User"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-ink-600 flex items-center gap-2">
                      <FaEnvelope className="text-ink-300" size={12} />{" "}
                      {u.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${
                          u.role === "admin"
                            ? "bg-accent-50 text-accent-600 ring-1 ring-accent-200"
                            : "bg-ink-50 text-ink-500"
                        }`}
                      >
                        {u.role || "User"}
                      </span>
                    </td>
                    <td className="p-4 text-ink-500 text-xs flex items-center gap-2">
                      <FaCalendarDays className="text-ink-300" size={12} />{" "}
                      {joinedDate}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {u.role !== "admin" && (
                        <button
                          onClick={() => handleDeleteUser(userId)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white inline-flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-50 rounded-2xl ring-1 ring-ink-100">
          <p className="text-ink-600">No users found in the database.</p>
        </div>
      )}
    </div>
  );
}
