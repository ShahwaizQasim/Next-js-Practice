"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"

// Zod Schema for Validation
const signupSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form setup
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    // Form Submit Handler
    const onSubmit = async(data: any) => {

        const response = await axios.post('/api/users/register');
        console.log("data", data);
        console.log("response", response);
        reset();
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                <p className="text-gray-500 text-center mb-6">Sign up to get started</p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* User Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">User Name</label>
                        <input
                            {...register("userName")}
                            type="text"
                            placeholder="Enter your username"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.userName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {errors.userName && <p role="alert" className="text-red-600 pt-1">{errors.userName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {errors.email && <p role="alert" className="text-red-600 pt-1">{errors.email.message}</p>}

                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.userName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                            {errors.password && <p role="alert" className="text-red-600 pt-1">{errors.password.message}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Extra Links */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
