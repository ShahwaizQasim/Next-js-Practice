"use client"
import { dbConnect } from "@/lib/dbConnect";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"; import { Success } from "./components/alert";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  dbConnect();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/logout");
      Success("Logout Successfully", "success")
      router.replace('/login')
    } catch (error) {
      Success((error as Error).message, "error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello World</h1>
      <button onClick={logout}>{loading ? "loading..." : "Logout"}</button>
    </div>
  );
}
