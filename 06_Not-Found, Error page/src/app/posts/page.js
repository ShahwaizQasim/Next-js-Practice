import SearchInput from "@/components/searchInput";
import Link from "next/link";

export default async function Posts({ searchParams }) {
    const { q, limit = 100, skip = 0 } = searchParams;
    let res = await fetch(q ?
        `https://dummyjson.com/posts/search?q=${q}&limit=${limit}&skip=${skip}` :
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
        throw new Error("API Not Working");
    }
    res = await res.json();

    return (
        <div className="container mx-auto">
            <h1 className="text-center pt-10 text-3xl font-semibold">Posts</h1>
            <SearchInput />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

                {
                    res.posts.map((posts) =>
                        <Link key={posts.id} href={`/posts/${posts.id}`}>
                            <div className="shadow rounded p-4 border">
                                <h1 className="font-bold text-center">{posts?.title}</h1>
                                <h2 className="text-center">{posts?.body.slice(0, 150)}</h2>
                                <div className="flex justify-center gap-4">
                                    <h3 className="font-bold">Likes {posts?.reactions.likes}</h3>
                                    <h3 className="font-bold">Views {posts?.views}</h3>
                                </div>
                            </div>
                        </Link>)
                }
            </div>
        </div>
    );
}