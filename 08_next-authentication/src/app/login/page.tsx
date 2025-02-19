"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6">Login to your account</p>

                <form className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Extra Links */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
