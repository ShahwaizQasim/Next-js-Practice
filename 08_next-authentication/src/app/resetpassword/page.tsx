"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Error, Success } from "../components/alert";
import { Eye, EyeOff } from "lucide-react";

// Zod Schema for Validation
const resetPasswordSchema = z.object({
  password1: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Password must be at least 6 characters"),
});

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [Token, setToken] = useState("");

  // React Hook Form setup
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, [searchParams]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", {
        token: Token,
        password1: data.password1,
        password2: data.password2,
      });
      console.log("response", response);

      Success("your password reset has been sucessfully", "success");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log("Data=>", data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      // Handle specific error messages
      if (error.response?.data?.message) {
        Success(error.response.data.message, "error"); // Show the exact error message
      } else {
        Success("Something went wrong, please try again", "error");
      }
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full">
          {/* Logo or Brand */}
          <div className="text-center mb-6">
            {/* Replace with your actual logo */}
            <h1 className="text-3xl font-bold text-blue-600">SMIT-Autograde</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                Reset Password
              </h2>
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="newPassword">New Password</label>
                    <div className="relative">
                      <input
                        {...register("password1")}
                        type={`${showPassword ? "text" : "password"}`}
                        id="newPassword"
                        placeholder="Enter your password"
                        className={`w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password1
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      />
                      {errors.password1 && (
                        <p role="alert" className="text-red-600 pt-1">
                          {errors.password1.message}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-5 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="relative">
                      <input
                        {...register("password2")}
                        type={`${showPassword2 ? "text" : "password"}`}
                        id="confirmPassword"
                        placeholder="Enter your password"
                        className={`w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password2
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      />
                      {errors.password2 && (
                        <p role="alert" className="text-red-600 pt-1">
                          {errors.password2.message}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword2(!showPassword2)}
                        className="absolute right-3 top-5 text-gray-500"
                      >
                        {showPassword2 ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg mt-7 font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send Verification Email"}
                  </button>
                </form>
              </>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link href="/login" className="text-blue-600 hover:underline">
                Back to Login
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link href="/help" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </p>
            <p className="mt-2">
              &copy; {new Date().getFullYear()} SMIT-Autograde. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
