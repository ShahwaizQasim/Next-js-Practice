import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Hello World</h1>
      <Link href={'/posts'}>
        <button className="border-2 border-black px-4 py-2">All Posts</button>
      </Link>
    </div>
  );
}
