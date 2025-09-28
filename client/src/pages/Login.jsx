
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../api/userServices';
import { userContext } from '../Context/context';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {setIsLogin,setUser} = useContext(userContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({email,password});
            setIsLogin(true);
            setUser({id:data.user.userId});
            toast.success("Login successful");
            navigate('/');
        } catch (error) {
            toast.error("Invalid Credentials")
        }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-100 mb-2">Sign In</h1>
                        <p className="text-slate-400">Welcome back to BlogEcho</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-400 hover:text-blue-300">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login