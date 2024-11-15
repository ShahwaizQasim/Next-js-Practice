import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Hello World</h1>
      <Link href={'/posts'}>
        <button className="mt-4 border-2 border-[#000] py-2 px-4 cursor-pointer hover:bg-black rounded-sm outline-none hover:text-white">Go Posts Page</button>
      </Link>
    </div>
  );
}
