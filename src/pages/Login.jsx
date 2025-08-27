import React, { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api.js";   // <-- make sure this import is here

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { fetchMe, loading } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
 
      const { data } = await api.post("/auth/login", { email, password });

     
      localStorage.setItem("token", data.token);
      console.log(data)

     
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  
     if (data.user) {
              useAuth.setState({ user: data.user, token: data.token });
             }

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>

        {error && (
          <p className="text-center text-sm text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/sinup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
