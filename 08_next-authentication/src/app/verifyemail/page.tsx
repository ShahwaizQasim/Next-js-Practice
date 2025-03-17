"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

const EmailVerification = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true);
        } catch (error) {
            setError(true)
            console.error('Verification failed:', (error as Error).message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const urlparams = new URLSearchParams(window.location.search);  // is method se hum searchbar se value get karte hain
        const urlToken = urlparams.get('token'); // or get karne se jo value apne searchbar me di hoi hai wo mil jati hai
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
                <div className="max-w-md w-full px-8 py-10 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Email Verification</h1>

                    {loading && (
                        <div className="flex flex-col items-center justify-center space-y-4 py-6">
                            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                            <p className="text-lg text-gray-700">Verifying your email...</p>
                        </div>
                    )}

                    {verified && !loading && (
                        <div className="flex flex-col items-center space-y-4 py-6">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                            <h2 className="text-2xl font-semibold text-gray-800">Email Verified Successfully!</h2>
                            <p className="text-gray-600 text-center mb-4">
                                Your email has been verified. You can now proceed to login.
                            </p>
                            <Link
                                href="/login"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-center w-full"
                            >
                                Proceed to Login
                            </Link>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="flex flex-col items-center space-y-4 py-6">
                            <XCircle className="h-16 w-16 text-red-500" />
                            <h2 className="text-2xl font-semibold text-gray-800">Verification Failed</h2>
                            <p className="text-gray-600 text-center mb-4">
                                We couldn't verify your email. The verification link may have expired or is invalid.
                            </p>
                            <div className="flex flex-col space-y-3 w-full">
                                <Link
                                    href="/register"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-center w-full"
                                >
                                    Register Again
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-300 text-center w-full"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    )}

                    {!token && !loading && !verified && !error && (
                        <div className="flex flex-col items-center space-y-4 py-6">
                            <p className="text-gray-600 text-center">
                                No verification token found. Please check your email and click on the verification link.
                            </p>
                        </div>
                    )}

                </div>
            </div>

        </>
    );
};

export default EmailVerification;