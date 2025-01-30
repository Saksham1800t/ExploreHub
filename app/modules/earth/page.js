"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const EarthImage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [lat, setLat] = useState(29.78); // Default: Houston, TX
    const [lon, setLon] = useState(-95.33);
    const [date, setDate] = useState("2018-01-01");
    const [dim, setDim] = useState(0.10); // 10km resolution

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

    const fetchImage = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=${dim}&api_key=${apiKey}`;
            const response = await axios.get(url);
            if (response.data.url) {
                setImageUrl(response.data.url);
            } else {
                setError("No image available for this location/date.");
            }
        } catch (err) {
            setError("Failed to fetch image. Please try again.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchImage(); // Fetch default image on load
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold mb-6">🌍 NASA Earth Imagery</h1>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col">
                    <label className="text-lg">Latitude:</label>
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        className="p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Longitude:</label>
                    <input
                        type="number"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                        className="p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 rounded-md bg-gray-700 text-white"
                        max={new Date().toISOString().split("T")[0]} // Prevent future dates
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Resolution (degrees):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={dim}
                        onChange={(e) => setDim(e.target.value)}
                        className="p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>
            </div>

            {/* Fetch Button */}
            <button
                onClick={fetchImage}
                className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-blue-700"
            >
                Fetch Image
            </button>

            {/* Loading & Error Messages */}
            {loading && <p className="mt-4 text-lg">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {/* Display Image */}
            {imageUrl && (
                <div className="mt-6 w-full max-w-2xl">
                    <img
                        src={imageUrl}
                        alt="Satellite View"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default EarthImage;
