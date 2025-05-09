"use client";
import { useState } from "react";

export default function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
     
    } catch (error) {
    console.log(error);
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form className="space-y-4" handleSubmit={onSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "loading..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
