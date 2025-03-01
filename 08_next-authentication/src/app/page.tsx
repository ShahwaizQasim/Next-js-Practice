import { dbConnect } from "@/lib/dbConnect";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

export default function Home() {
  dbConnect();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello World</h1>
      <Link href={"/login"}>
        <button>Login</button>
      </Link>
      <Toaster />
    </div>
  );
}
