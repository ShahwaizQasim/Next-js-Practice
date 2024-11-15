import Link from "next/link"


function NotFound() {
    return (
        <div className="h-dvh flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
            <Link href={'/posts'} className="mt-6">
                <button className="mt-2 border-2 border-[#000] py-2
                 px-4 cursor-pointer hover:bg-black rounded-sm outline-none hover:text-white">
                    Go To Post Page
                </button>
            </Link>

        </div>
    )
}

export default NotFound