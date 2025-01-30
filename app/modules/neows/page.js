"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Asteroids = () => {
    const [asteroidData, setAsteroidData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState("");  // Initialize to empty string
    const [currentDate, setCurrentDate] = useState("");
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

    // Set today's date as default for `date` state
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setCurrentDate(today);
        fetchAsteroidData(today); // Fetch asteroid data for today's date
    }, []);

    const fetchAsteroidData = async (customDate = "") => {
        try {
            setLoading(true);
            setError(null); // Clear any previous errors
            const url = customDate
                ? `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}&start_date=${customDate}&end_date=${customDate}`
                : `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}&start_date=${new Date().toISOString().split('T')[0]}&end_date=${new Date().toISOString().split('T')[0]}`;
            const response = await axios.get(url);
            if (!response.data.near_earth_objects[customDate]) {
                setError("Be happy, there are no upcoming asteroids today!");
            } else {
                setAsteroidData(response.data);
            }
            setCurrentDate(customDate || new Date().toISOString().split('T')[0]);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch data. Please try again.");
            setLoading(false);
        }
    };

    // Handlers for the date input and fetching asteroid data
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleFetchForCustomDate = () => {
        fetchAsteroidData(date); // Fetch data for the selected date
    };

    const handleNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        fetchAsteroidData(nextDayStr);
    };

    const handlePreviousDay = () => {
        const prevDay = new Date(currentDate);
        prevDay.setDate(prevDay.getDate() - 1);
        const prevDayStr = prevDay.toISOString().split('T')[0];
        fetchAsteroidData(prevDayStr);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-4">
            <div className="flex-grow">
                <h1 className="text-4xl font-extrabold mb-8">Asteroids NeoWs - Near-Earth Objects</h1>
                {loading ? (
                    <div className="loader">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                    </div>
                ) : error ? (
                    <div className="text-lg text-red-500">{error}</div>
                ) : (
                    <div className="w-full max-w-3xl bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-2xl transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold mb-4">Asteroids for {currentDate}</h2>
                        {asteroidData && asteroidData.near_earth_objects[currentDate] && (
                            <div className="space-y-4">
                                {asteroidData.near_earth_objects[currentDate].map((asteroid) => (
                                    <div key={asteroid.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                                        <h3 className="text-xl font-bold text-white">{asteroid.name}</h3>
                                        <p className="text-gray-400">Hazardous: {asteroid.is_hazardous ? "Yes" : "No"}</p>
                                        <p className="text-gray-400">Estimated Diameter: {asteroid.estimated_diameter.meters.estimated_diameter_max} meters</p>
                                        {asteroid.close_approach_data && asteroid.close_approach_data[0] && (
                                            <p className="text-gray-400">Closest Approach: {asteroid.close_approach_data[0].close_approach_date}</p>
                                        )}
                                        {asteroid.close_approach_data && asteroid.close_approach_data[0] && (
                                            <p className="text-gray-400">Velocity: {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
                                        )}
                                        <a
                                            href={asteroid.nasa_jpl_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block py-2 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
                                        >
                                            More Info
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Custom Date Input */}
            <div className="flex items-center my-4">
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="p-2 rounded-md bg-gray-700 text-white"
                />
                <button
                    onClick={handleFetchForCustomDate}
                    className="ml-4 inline-block py-2 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-indigo-700"
                >
                    Get Asteroids for Selected Date
                </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4 mb-4">
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
    );
};

export default Asteroids;
