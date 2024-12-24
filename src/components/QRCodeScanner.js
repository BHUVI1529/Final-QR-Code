import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './apptechknowlogo.jpeg'; // Update the path to your logo

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [instituteName, setInstituteName] = useState('');
    const [scanComplete, setScanComplete] = useState(false);
    const [warningMessage, setWarningMessage] = useState(''); // Warning message state
    const isProcessingRef = useRef(false); // Ref to prevent multiple API calls
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (!userId) {
            setError('You need to log in before scanning the QR code.');
            navigate('/login');
        }
    }, [navigate, userId]);

    const handleScan = async (result) => {
        if (result && !isProcessingRef.current) {
            isProcessingRef.current = true; // Prevent further processing
            setScanComplete(true);

            try {
                const data = JSON.parse(result.text);
                const { location, institutename } = data;

                if (location && institutename) {
                    setInstituteName(institutename);
                    const instituteId = await fetchInstituteId(institutename);
                    if (instituteId) {
                        await determineAttendanceAction(instituteId);
                    } else {
                        setError('Institute details not found. Please try again.');
                        resetScanner();
                    }
                } else {
                    setError('Invalid QR code: Missing required information.');
                    resetScanner();
                }
            } catch (err) {
                console.error('Error parsing QR code data:', err);
                setError('Invalid QR code format.');
                resetScanner();
            }
        }
    };

    const handleError = (error) => {
        console.error('QR Code scanning error:', error);
        setError('Unable to access camera or scan QR code');
    };

    const fetchInstituteId = async (instituteName) => {
        try {
               // const response = await axios.get('https://final-attendance.onrender.com/api/institute/id', {
                const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName },
            });
            console.log('Institute ID fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching institute ID:', error);
            setError('Unable to fetch institute details.');
            return null;
        }
    };

    const determineAttendanceAction = async (instituteId) => {
        try {
             //const response = await axios.post('https://final-attendance.onrender.com/api/attendance/determine', { userId });
              const response = await axios.post('http://localhost:8080/api/attendance/determine', { userId });
            const { loginOption } = response.data;

            if (loginOption === 'login') {
                await markAttendance(userId, instituteId, 'login');
            } else if (loginOption === 'logout') {
                navigate(`/remark/${userId}/${instituteId}`);
            } else {
                setError('Unable to determine attendance action.');
                resetScanner();
            }
        } catch (error) {
            console.error('Error determining attendance action:', error);
            setError('Error determining attendance action. Please try again.');
            resetScanner();
        }
    };

    const markAttendance = async (userId, instituteId, loginOption) => {
        try {
            const attendanceData = {
                user: { id: userId },
                loginOption,
                instituteId,
            };
           // await axios.post('https://final-attendance.onrender.com/api/attendance/add', attendanceData);
            await axios.post('http://localhost:8080/api/attendance/add'  , attendanceData);
            navigate('/login-success');
        } catch (error) {
            console.error('Error marking attendance:', error);
            setError('Error marking attendance. Please try again.');
            resetScanner();
        }
    };

    const resetScanner = () => {
        isProcessingRef.current = false; // Reset processing state
        setScanComplete(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="AppteKnow Logo" className="w-24 h-16 sm:w-32  sm:h-20 md:w-40 md:h-24 object-contain" />
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transition-all ease-in-out transform hover:scale-105">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center text-teal-700">QR Code Scanner</h2>

                    {error && (
                        <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
                    )}
                    {warningMessage && (
                        <p className="text-yellow-500 font-bold text-center mt-4">
                            {warningMessage}
                        </p>
                    )}

                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                onResult={handleScan}
                                onError={handleError}
                                constraints={{
                                    facingMode: "environment", // Specifies the back camera
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80"></div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-lg sm:text-xl text-gray-700 font-semibold">Ensure you're within the institute's premises to scan the code.</p>
                        <p className="text-sm text-gray-500 mt-2">If you face any issues, please contact support.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
                </p>
                <p className="text-sm sm:text-base">
                    Designed and developed by GRID R&D
                </p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;
