"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Apod = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(""); 
    const [currentDate, setCurrentDate] = useState(""); 

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY; 

    const fetchApodData = async (customDate = "") => {
        try {
            setLoading(true);
            setError(null);
            const url = customDate
                ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${customDate}`
                : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
            const response = await axios.get(url);
            setApodData(response.data);
            setCurrentDate(customDate || new Date().toISOString().split('T')[0]); // Default to today's date
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch data. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApodData(); 
    }, []);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0]; // Get today's date

        // Prevent future dates
        if (selectedDate > today) {
            setError("Please select a valid date (not in the future).");
            setDate(today); // Reset to today's date
        } else {
            setError(null); // Clear error
            setDate(selectedDate);
        }
    };

    const handleFetchForCustomDate = () => {
        if (date) {
            fetchApodData(date);
        }
    };

    const handleNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        fetchApodData(nextDayStr);
    };

    const handlePreviousDay = () => {
        const prevDay = new Date(currentDate);
        prevDay.setDate(prevDay.getDate() - 1);
        const prevDayStr = prevDay.toISOString().split('T')[0];
        fetchApodData(prevDayStr);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold mb-8">Astronomy Picture of the Day</h1>
            {loading ? (
                <div className="text-lg">Loading...</div>
            ) : error ? (
                <div className="text-lg text-red-500">{error}</div>
            ) : (
                <div className="w-full max-w-3xl bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg hover:shadow-purple-950 transition-all duration-300 ease-in-out">
                    <h2 className="text-2xl font-extrabold mb-4">{apodData.title}</h2>
                    <h5 className="mb-2">{currentDate}</h5>
                    <img
                        src={apodData.url}
                        alt="Astronomy Image"
                        className="mt-6 w-full max-w-2xl rounded-lg mb-5"
                    />
                    <p className="text-white mb-4">{apodData.explanation}</p>

                    {/* Custom Date Input */}
                    <div className="flex items-center mb-4">
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            max={new Date().toISOString().split('T')[0]} // Disable future dates
                            className="p-2 rounded-md bg-gray-700 text-white"
                        />
                        <button
                            onClick={handleFetchForCustomDate}
                            className="ml-4 inline-block py-2 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-indigo-700"
                        >
                            Get Picture for Selected Date
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex space-x-4">
                        <button
                            onClick={handlePreviousDay}
                            className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-blue-700"
                        >
                            Previous Day
                        </button>
                        <button
                            onClick={handleNextDay}
                            className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-blue-700"
                        >
                            Next Day
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Apod;
