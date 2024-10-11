import Link from "next/link";

function Header(){
    return(
        <>
        <div className="header">
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/posts">All Posts</Link>
        </div>
        </>
    )
}

export default Header;