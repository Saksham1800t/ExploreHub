"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const EarthFromSpace = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const [date, setDate] = useState(today);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

    const fetchImages = async (selectedDate) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}`, {
                params: { api_key: apiKey },
            });

            if (response.data.length > 0) {
                setImages(response.data);
            } else {
                findClosestDate();
            }
        } catch (err) {
            setError("Failed to load Earth images. Try again later.");
        }
        setLoading(false);
    };

    const findClosestDate = async () => {
        let currentDate = new Date(date);
        let attempts = 7; // Try up to 7 previous days

        for (let i = 0; i < attempts; i++) {
            currentDate.setDate(currentDate.getDate() - 1);
            const formattedDate = currentDate.toISOString().split("T")[0];

            try {
                const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${formattedDate}`, {
                    params: { api_key: apiKey },
                });

                if (response.data.length > 0) {
                    setDate(formattedDate);
                    setImages(response.data);
                    return;
                }
            } catch {
                continue;
            }
        }

        setError("No recent images found.");
    };

    useEffect(() => {
        fetchImages(date);
    }, [date]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-extrabold text-center mb-6">🌍 Earth From Space</h1>
            <p className="text-gray-400 text-lg text-center mb-4">
                View stunning images of Earth captured by NASA's DSCOVR EPIC satellite.
            </p>

            {/* 📅 Date Selector (Prevents Future Dates) */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <input
                    type="date"
                    value={date}
                    max={today} // Prevents future date selection
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                />
            </div>

            {/* 🔄 Loading / Error Messages */}
            {loading && <p className="text-lg text-indigo-400">Loading Earth images...</p>}
            {error && <p className="text-lg text-red-500">{error}</p>}

            {/* 🖼 Display Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {images.length > 0 ? (
                    images.map((img) => (
                        <div key={img.identifier} className="relative group">
                            <img
                                src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replaceAll("-", "/")}/png/${img.image}.png`}
                                alt="Earth from Space"
                                className="w-full rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                                <p className="text-white text-sm font-semibold">{img.caption}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-lg text-gray-400">No images found. Try another date.</p>
                )}
            </div>
        </div>
    );
};

export default EarthFromSpace;
