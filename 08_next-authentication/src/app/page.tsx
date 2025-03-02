"use client"
import { dbConnect } from "@/lib/dbConnect";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  dbConnect();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/logout");
      toast.success("Logout Successfully");
      router.push('/login')
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello World</h1>
      <button onClick={logout}>{loading ? "loading..." : "Logout"}</button>
      <Toaster />
    </div>
  );
}
