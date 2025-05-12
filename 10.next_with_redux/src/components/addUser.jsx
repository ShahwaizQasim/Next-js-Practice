"use client";
import { addUser } from "@/redux/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddUser() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleUser = () => {
    console.log("name", name);
    dispatch(addUser(name))
    
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=> setName(e.target.value) }
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2`}
            />
          </div>
          {/* Login Button */}
          <button
          onClick={handleUser}
            className="w-full mt-3 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {"Add User"}
          </button>
      </div>
    </div>
  );
}
