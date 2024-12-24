import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from './apptechknowlogo.jpeg'; // Update the path to your logo

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phoneNumber
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const role = 'USER'; // Role is set directly to user

    const handleRegister = async (e) => {
        e.preventDefault();
        // Validate phoneNumber
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setMessage('Phone number must be exactly 10 digits.');
            return;
        }

        try {
            await api.post('/register', { name, email, password, phoneNumber, role, course });
            setMessage('Registration successful. You can now log in.');
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
            console.error('Registration Error:', error.response || error);
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100">
            {/* Top Header Section */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Left side: ApptechKnow logo with larger size */}
                <img src={logo} alt="AppteckKnow Logo" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain" />

                {/* Centered Heading */}
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Registration Form */}
            <div className="flex-1 flex items-center justify-center mt-16 px-4 sm:px-6 md:px-8 mb-8">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 text-center mb-6">Register</h2>
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                autoComplete="off"
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoComplete="off"
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="off"
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Phone Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Enter your phone number"
                                maxLength="10" // Restrict input to 10 characters
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Course</label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            >
                                <option value="">Select your course</option>
                                <option value="Java Full Stack">Java Full Stack</option>
                                <option value="Python Full Stack">Python Full Stack</option>
                                <option value="Data Analyst">Data Analyst</option>
                                <option value="Testing">Testing</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Register
                        </button>
                        {message && (
                            <p className={`text-center mt-4 ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'} font-medium`}>
                                {message}
                            </p>
                        )}
                    </form>
                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-green-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} ApptechKnow Careers. All rights reserved.
                </p>
                <p className="text-xs sm:text-sm">
                    Designed and developed by GRID R&D
                </p>
            </footer>
        </div>
    );
};

export default Register;
