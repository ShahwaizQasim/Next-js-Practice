import Link from "next/link";

async function ProductDetail({ params }) {
    let res = await fetch(`https://dummyjson.com/posts/${params.id}`);
    res = await res.json();

    return (
        <div className="container mx-auto">

            <h1 className="text-center pt-14 text-3xl font-semibold">Post Detail</h1>
            <div className="flex justify-center items-center">
                <div className="w-1/2 h-[400px] mt-8">
                    <h1 className="text-center text-2xl font-bold">{res?.title}</h1>
                    <h2 className="text-center px-3 pt-3">{res?.body}</h2>
                    <Link href={'/posts'} className="flex justify-center mt-4">
                        <button className="mt-2 border-2 border-[#000] py-2 px-4 cursor-pointer hover:bg-black rounded-sm outline-none hover:text-white">Go Back</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail