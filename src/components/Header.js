import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaClipboardList, FaUserCheck, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import logo from './apptechknowlogo.jpeg'; // Replace with the actual logo path

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'border-b-2 border-white' : '';
  };

  return (
    <div className="bg-gray-800 text-white  flex items-center justify-between relative z-50"> {/* Reduced padding */}
      {/* Logo Section */}
      <div className="flex items-center "> {/* Reduced padding around logo */}
        <img
          src={logo}
          alt="AppTechKnow Logo"
          className="w-24 h-20 sm:w-32 sm:h-28 md:w-40 md:h-32 object-contain" // Reduced logo size
        />
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="text-white text-3xl md:hidden focus:outline-none z-60" // Set z-index to ensure it's on top
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Fullscreen Navigation Menu */}
      <nav
        className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-4 transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:bg-transparent md:flex-row md:space-y-0 md:space-x-4 md:h-auto md:w-auto z-50`} // Reduced space between menu items
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-3xl md:hidden z-60"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Menu Links */}
        <ul className="text-center md:flex md:space-x-4"> {/* Reduced space between links */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center justify-center space-x-2 text-2xl md:text-base p-2 hover:bg-gray-700 md:hover:bg-transparent rounded ${isActive('/admin/dashboard')}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/candidates"
              className={`flex items-center justify-center space-x-2 text-2xl md:text-base p-2 hover:bg-gray-700 md:hover:bg-transparent rounded ${isActive('/candidates')}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaUsers />
              <span>Candidates</span>
            </Link>
          </li>
          <li>
            <Link
              to="/view-attendance"
              className={`flex items-center justify-center space-x-2 text-2xl md:text-base p-2 hover:bg-gray-700 md:hover:bg-transparent rounded ${isActive('/view-attendance')}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaCalendarAlt />
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link
              to="/absentees"
              className={`flex items-center justify-center space-x-2 text-2xl md:text-base p-2 hover:bg-gray-700 md:hover:bg-transparent rounded ${isActive('/absentees')}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaClipboardList />
              <span>Absentees</span>
            </Link>
          </li>
          <li>
            <Link
              to="/leaves"
              className={`flex items-center justify-center space-x-2 text-2xl md:text-base p-2 hover:bg-gray-700 md:hover:bg-transparent rounded ${isActive('/leaves')}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCheck />
              <span>Leave Approval</span>
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-2xl md:text-base"
              onClick={() => setMenuOpen(false)}
            >
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
