"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const MarsWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [sols, setSols] = useState([]);
    const [selectedSol, setSelectedSol] = useState(null);
    const [tempType, setTempType] = useState("av");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(apiUrl);
                const solKeys = response.data.sol_keys;
                if (solKeys.length > 0) {
                    setSols(solKeys);
                    setSelectedSol(solKeys[solKeys.length - 1]); // Set latest Sol
                    setWeatherData(response.data);
                }
            } catch (err) {
                setError("Failed to fetch Mars weather data.");
            }
            setLoading(false);
        };
        fetchWeather();
    }, []);

    const getWindDirection = (wd) => {
        return wd?.most_common ? `${wd.most_common.compass_point} (${wd.most_common.compass_degrees}°)` : "N/A";
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-extrabold text-center mb-6">🌌 Mars Weather</h1>
            <p className="text-gray-400 text-lg text-center mb-4">
                Track Mars weather conditions including temperature, wind speed, and atmospheric pressure.
            </p>

            {loading ? (
                <div className="text-lg text-indigo-400">Loading weather data...</div>
            ) : error ? (
                <div className="text-lg text-red-500">{error}</div>
            ) : (
                <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-2xl transition-all duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-center mb-4">📅 Select Martian Sol</h2>
                    <div className="flex justify-center gap-4 mb-4">
                        <select
                            value={selectedSol}
                            onChange={(e) => setSelectedSol(e.target.value)}
                            className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                        >
                            {sols.map((sol) => (
                                <option key={sol} value={sol}>Sol {sol}</option>
                            ))}
                        </select>

                        <select
                            value={tempType}
                            onChange={(e) => setTempType(e.target.value)}
                            className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                        >
                            <option value="av">Avg Temp</option>
                            <option value="mn">Min Temp</option>
                            <option value="mx">Max Temp</option>
                        </select>
                    </div>

                    {selectedSol && weatherData[selectedSol] ? (
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold mb-2">Weather on Sol {selectedSol}</h3>
                            <p className="text-gray-400 text-sm">
                                📆 Earth Date: {new Date(weatherData[selectedSol].First_UTC).toDateString()} - {new Date(weatherData[selectedSol].Last_UTC).toDateString()}
                            </p>
                            <p className="text-gray-400 text-sm">🌍 Martian Season: {weatherData[selectedSol].Season}</p>
                            <div className="mt-4">
                                <p className="text-gray-300 text-lg">🌡 Temperature: {weatherData[selectedSol].AT?.[tempType]} °C</p>
                                <p className="text-gray-300 text-lg">💨 Wind Speed: {weatherData[selectedSol].HWS?.av} m/s</p>
                                <p className="text-gray-300 text-lg">🌬 Atmospheric Pressure: {weatherData[selectedSol].PRE?.av} Pa</p>
                                <p className="text-gray-300 text-lg">🧭 Wind Direction: {getWindDirection(weatherData[selectedSol].WD)}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No data available for this Sol.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarsWeather;
