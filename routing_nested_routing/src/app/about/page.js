import Link from "next/link";

function About (){
    return(
        <>
        <h1 className="text-center pt-20 text-3xl font-bold">
            WELCOME TO ABOUT PAGE
        </h1>
        <Link href={'/about/contact'}>Go to Contact Page</Link>
        </>
    )
}
export default About;