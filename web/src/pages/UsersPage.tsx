import React, { useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  createdAt?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formEmail, password: formPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create user");
      }
      setFormEmail("");
      setFormPassword("");
      await fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create user");
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user");
      }
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete user");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-gray-400 text-sm">
              Add, view, and remove users that can log in.
            </p>
          </div>
          <a
            href="/hr"
            className="text-sm text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Dashboard
          </a>
        </div>

        {/* Add user form */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-medium mb-3">Add New User</h2>
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
          >
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email
              </label>
              <input
                className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 text-sm"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                placeholder="user@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 text-sm"
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                required
                placeholder="Temporary password"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              Add User
            </button>
          </form>
          {error && (
            <p className="text-red-400 text-xs mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Users list */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Existing Users</h2>
            <button
              onClick={fetchUsers}
              className="text-xs px-3 py-1 border border-white/20 rounded-md hover:bg-white/10"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading users…</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2">Email</th>
                  <th className="py-2 w-40">Created</th>
                  <th className="py-2 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-white/5">
                    <td className="py-2">{u.email}</td>
                    <td className="py-2 text-gray-500">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
