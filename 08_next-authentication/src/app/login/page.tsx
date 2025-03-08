"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Success } from "../components/alert";

// Zod Schema for Validation
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      Success("Login Successfully", "success")
      console.log(data);
      console.log("response=>", response);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error=>", error);
        const errorData = error?.response?.data?.msg;
        Success(errorData, "error")
        console.log("Error data:", errorData);
      } else {
        Success((error as Error).message, "error")
        console.log("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
    reset();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.email && (
              <p role="alert" className="text-red-600 pt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.password && (
                <p role="alert" className="text-red-600 pt-1">
                  {errors.password.message}
                </p>
              )}
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
            {loading ? "loading..." : "Login"}
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

};