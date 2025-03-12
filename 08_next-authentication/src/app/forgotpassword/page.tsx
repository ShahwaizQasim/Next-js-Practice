"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema for Validation
const signupSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const ForgotPassword = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

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
            setLoading(true)
            console.log(data);
            setStatus('success');
            reset();
        } catch (error) {
            console.log(error);
        } finally {
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
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Forgot Password</h2>
                            <>
                                <p className="text-gray-600 mb-6 text-center">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-5">
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
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                                    >
                                        {
                                            loading ? 'Sending...' : 'Send Verification Code'
                                        }
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
                        <p>Need help? <Link href="/help" className="text-blue-600 hover:underline">Contact Support</Link></p>
                        <p className="mt-2">&copy; {new Date().getFullYear()} SMIT-Autograde. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;