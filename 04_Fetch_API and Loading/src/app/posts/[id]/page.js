export default async function ProductDetail({ params }) {
    let res = await fetch(`https://dummyjson.com/posts/${params.id}`);
    res = await res.json();
    console.log('res. ', res);

    return (
        <div className="flex justify-center mt-20">
            <div className="border-2 border-black w-1/2 rounded">
                <h1 className="text-3xl pt-5 text-center font-bold">{res?.title}</h1>
                <p className="text-1xl pt-5 text-center">{res?.body}</p>
                <h1 className="text-center pt-2 pb-5">
                    {
                        res?.tags.map((tags) => (
                            <div className="p-2 inline-block font-bold bg-blue-50" >
                                {tags}
                            </div>
                        ))
                    }
                </h1>
            </div>
        </div>
    )
}