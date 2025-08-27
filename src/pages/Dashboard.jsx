import { useEffect, useState } from "react";
import { api } from "../api/api.js";
import { useAuth } from "../store/useAuth";
import React from "react";

export default function Dashboard() {
  const { user, fetchMe, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [updateform, setUpdateForm] = useState(null);

  useEffect(() => {
    fetchMe();
    load();
  }, []);

  const load = async () => {
    const { data } = await api.get("/projects");
    setProjects(data.projects);
  };

  const create = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    await api.post("/projects", form);
    setForm({ name: "", description: "" });
    load();
  };

  const update = async (e) => {
    e.preventDefault();
    if (!updateform?.name) return;

    await api.put(`/projects/${updateform._id}`, {
      name: updateform.name,
      description: updateform.description,
    });
    setUpdateForm(null);
    load();
  };

  const del = async (id) => {
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            {user?.name}{" "}
            <span className="text-sm text-gray-500">({user?.role})</span>
          </span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Create Project */}
      <section className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Create Project
        </h3>
        <form onSubmit={create} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      </section>

      {/* Projects List */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Your Projects
        </h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet. Create one above.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center bg-white shadow rounded-lg px-4 py-3"
              >
                {updateform?._id === p._id ? (
                  // Editing Form
                  <form
                    onSubmit={update}
                    className="flex flex-col sm:flex-row gap-2 flex-1"
                  >
                    <input
                      type="text"
                      value={updateform.name}
                      onChange={(e) =>
                        setUpdateForm({ ...updateform, name: e.target.value })
                      }
                      className="flex-1 px-2 py-1 border rounded-md"
                    />
                    <input
                      type="text"
                      value={updateform.description}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateform,
                          description: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpdateForm(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                
                  <>
                    <span className="text-gray-800">
                      <strong>{p.name}</strong> – {p.description}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUpdateForm(p)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => del(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
