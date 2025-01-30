"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const MarsRover = () => {
    const [rover, setRover] = useState("Curiosity");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [camera, setCamera] = useState("");
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const availableCameras = {
        Curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
        Perseverance: ["EDL_RUCAM", "EDL_RDCAM", "EDL_DDCAM", "NAVCAM_LEFT", "NAVCAM_RIGHT"],
        Opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
        Spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    };

    const fetchPhotos = async (selectedDate) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
                params: {
                    earth_date: selectedDate || date,
                    camera: camera || undefined,
                    api_key: apiKey,
                },
            });

            if (response.data.photos.length > 0) {
                setPhotos(response.data.photos);
            } else {
                if (!selectedDate) {
                    findClosestDate();
                } else {
                    setError("No photos found for this date. Try another.");
                }
            }
        } catch (err) {
            setError("Failed to load photos. Try again later.");
        }

        setLoading(false);
    };

    const findClosestDate = async () => {
        let currentDate = new Date(date);
        let attempts = 10; // Try up to 10 previous days

        for (let i = 0; i < attempts; i++) {
            currentDate.setDate(currentDate.getDate() - 1);
            const formattedDate = currentDate.toISOString().split("T")[0];

            try {
                const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
                    params: {
                        earth_date: formattedDate,
                        api_key: apiKey,
                    },
                });

                if (response.data.photos.length > 0) {
                    setDate(formattedDate);
                    setPhotos(response.data.photos);
                    return;
                }
            } catch {
                continue;
            }
        }

        setError("No recent photos found.");
    };

    useEffect(() => {
        fetchPhotos();
    }, [rover, date, camera]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-extrabold text-center mb-6">🚀 Mars Rover Photos</h1>
            <p className="text-gray-400 text-lg text-center mb-4">
                Browse the latest images from Mars rovers like Curiosity and Perseverance.
            </p>

            {/* 🔥 Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                {/* 🔘 Rover Selector */}
                <select
                    value={rover}
                    onChange={(e) => {
                        setRover(e.target.value);
                        setCamera(""); // Reset camera selection
                    }}
                    className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                >
                    <option value="Curiosity">Curiosity</option>
                    <option value="Perseverance">Perseverance</option>
                    <option value="Opportunity">Opportunity</option>
                    <option value="Spirit">Spirit</option>
                </select>

                {/* 🔘 Camera Selector */}
                <select
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                >
                    <option value="">All Cameras</option>
                    {availableCameras[rover].map((cam) => (
                        <option key={cam} value={cam}>{cam}</option>
                    ))}
                </select>

                {/* 📅 Date Selector */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                />
            </div>

            {/* 🔄 Loading / Error Messages */}
            {loading && <p className="text-lg text-indigo-400">Loading photos...</p>}
            {error && <p className="text-lg text-red-500">{error}</p>}

            {/* 📸 Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id} className="relative group">
                            <img
                                src={photo.img_src}
                                alt="Mars Rover"
                                className="w-full rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                                <p className="text-white text-sm font-semibold">{photo.camera.full_name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-lg text-gray-400">No photos found. Try a different date or settings.</p>
                )}
            </div>
        </div>
    );
};

export default MarsRover;
