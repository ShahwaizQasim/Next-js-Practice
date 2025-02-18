import { NextPage } from 'next'
import Link from 'next/link'

interface Props { }

const Signup: NextPage<Props> = ({ }) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                    <h3 className="text-center mb-4">Sign Up</h3>
                    <form>
                        <div className="mb-3 flex gap-4">
                            <label htmlFor="fullname" className="form-label">UserName</label>
                            <input type="name" className="form-control" id="name" placeholder="Enter your Name" required />
                        </div>
                        <div className="mb-3 flex gap-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3 flex gap-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">SignUp</button>
                        <p>Already have an account <Link href={'/login'}>Login</Link></p>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup