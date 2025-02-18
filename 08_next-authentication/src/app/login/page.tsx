import { NextPage } from 'next'
import Link from 'next/link'

interface Props { }

const Login: NextPage<Props> = ({ }) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                    <h3 className="text-center mb-4">Login</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <p>Don't have an account <Link href={'/signup'}>SignUp</Link></p>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login