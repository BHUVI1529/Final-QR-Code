import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './apptechknowlogo.jpeg'; // Update the path to your logo

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
             const response = await axios.post('https://final-attendance.onrender.com/api/login', { email, password });
            // const response = await axios.post('http://localhost:8080/api/login', { email, password });

            if (response.status === 200) {
                const loginResponse = response.data;

                console.log('Login Response:', loginResponse);

                if (loginResponse.Id) {
                    localStorage.setItem('id', loginResponse.Id);
                    console.log('User ID stored in localStorage:', loginResponse.Id);
                } else {
                    console.error('User ID is missing in the response');
                }

                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('role', loginResponse.role);
                localStorage.setItem('email', loginResponse.email);

                console.log('User ID:', loginResponse.Id);
                console.log('Token:', loginResponse.token);
                console.log('Role:', loginResponse.role);

                if (loginResponse.role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            } else {
                setError('Invalid login credentials');
                console.error('Failed to login with status:', response.status);
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Logo */}
                <img
                    src={logo}
                    alt="ApptechKnow Logo"
                    className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain"
                />
                {/* Heading */}
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Login Form */}
            <div className="flex-grow flex items-center justify-center mt-16 px-4 sm:px-6 md:px-8 mb-8">
                <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-6">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Login
                        </button>
                        {error && (
                            <p className="text-center text-red-500 mt-3 font-medium">
                                {error}
                            </p>
                        )}
                    </form>
                    <p className="text-gray-500 mt-6 text-sm">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-teal-700 text-white text-center py-4">
                <p className="text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
                </p>
                <p className="text-xs sm:text-sm">
                    Designed and developed by GRID R&D
                </p>
            </footer>
        </div>
    );
};

export default Login;
