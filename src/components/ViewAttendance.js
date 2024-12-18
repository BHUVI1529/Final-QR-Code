import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('https://final-attendance.onrender.com/admin/attendance/all');
        //const response = await axios.get('http://localhost:8080/admin/attendance/all');
        setAttendanceData(response.data); // Set fetched data
        setLoading(false); // Mark loading as false
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data.');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

   // Fetch attendance data for selected date
   const fetchAttendanceByDate = async () => {
    if (!selectedDate) return;

    try {
      //const response = await axios.get(`http://localhost:8080/admin/attendance/date?date=${selectedDate}`);
      const response = await axios.get(`https://final-attendance.onrender.com/admin/attendance/date?date=${selectedDate}`);
      setAttendanceData(response.data); // Update attendance data
    } catch (err) {
      console.error('Error fetching attendance data for the selected date:', err);
      setError('Failed to load attendance data for the selected date.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#555', fontSize: '18px' }}>Loading attendance data...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">View Attendance</h1>

      {/* Date Input and Fetch Button */}
      {/* Date Input and Fetch Button */}
<div className="flex flex-col items-center mb-8">
  <div className="flex items-center">
    {/* Centered HTML date input */}
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)} // Update state with selected date
      className="px-4 py-2 max-w-xs text-lg border border-gray-300 rounded-md mr-4"
    />
    <button
      onClick={fetchAttendanceByDate}
      className="px-4 py-2 max-w-xs bg-green-500 text-white text-lg font-medium rounded-md hover:bg-green-600"
    >
      Fetch Attendance
    </button>
  </div>
</div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left">S.No</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Login Option</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Login Time</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Remarks for Logout</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-3">
                  {attendance.user ? attendance.user.name || 'No Name' : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-3">{attendance.loginOption}</td>
                <td className="border border-gray-300 px-4 py-3">
                  {attendance.loginTime
                    ? new Date(attendance.loginTime).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      }) +
                      ` on ${new Date(attendance.loginTime).toLocaleDateString('en-GB')}`
                    : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {attendance.loginOption === 'login' && !attendance.remarks
                    ? '-------------'
                    : attendance.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
