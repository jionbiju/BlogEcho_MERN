import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { registerUser } from '../api/userServices';

const Register = () => {

    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
     const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await registerUser({ username, email, password });
            toast.success("Registration successful");
            navigate('/login');
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };
   

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-100 mb-2">Sign Up</h1>
                        <p className="text-slate-400">Join BlogEcho today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:text-blue-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register