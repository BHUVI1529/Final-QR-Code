import React from 'react';
import { Link } from 'react-router-dom';
import logo from './apptechknowlogo.jpeg'; // Replace with the actual logo path

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-100 via-pink-50 to-lime-50">
            {/* Navbar */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Left side: ApptechKnow logo with adjusted size */}
                <img src={logo} alt="ApptechKnow Logo" className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 object-contain" />

                {/* Centered Heading */}
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Main Content Container */}
            <div className="flex-grow flex items-center justify-center mt-16 px-4 sm:px-0">
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center space-y-8">
                    {/* Welcome Message */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-teal-700">
                        Welcome to the Attendance Marking System
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500">
                        Track and manage attendance with ease.
                    </p>

                    {/* Login and Register Buttons */}
                    <div className="space-y-4">
                        <Link to="/login">
                            <button className="w-full bg-teal-500 text-white font-medium py-3 rounded-xl shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-200">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="w-full bg-lime-500 text-white font-medium py-3 rounded-xl shadow-md hover:bg-lime-600 hover:shadow-lg transition-all duration-200">
                                Register
                            </button>
                        </Link>
                    </div>
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

export default Home;
