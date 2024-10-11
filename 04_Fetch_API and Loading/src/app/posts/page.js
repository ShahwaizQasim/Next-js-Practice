import Link from "next/link";

async function Posts() {
  let res = await fetch("https://dummyjson.com/posts", { cache: "no-cache" });
  res = await res.json();
  console.log("res", res);

  return (
    <>
      <div className="container">
        <h1 className="text-center text-4xl pt-4 font-bold mb-3">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {res?.posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="flex flex-col p-2 border-2 border-black font-mono rounded">
                <h1 className="font-bold text-2xl">{post?.title}</h1>
                <h3 className="font-normal">{post?.body}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Posts;
