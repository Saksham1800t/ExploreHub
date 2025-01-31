"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleButtonClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault(); // Prevents the default link behavior
            window.location.href = "/auth/login"; // Redirects to the login page
        }
    };

    return (
        <div className="min-h-screen h-full w-full px-1 py-1 bg-black">
            <div className="container mx-auto px-6 py-15 ">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-4">
                        ExploreHub
                    </h1>
                    <p className="text-lg mb-8">
                        A centralized dashboard that brings together the wonders of space, Earth, and planetary exploration.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Astronomy Picture of the Day */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Astronomy Picture of the Day</h2>
                        <p className="text-gray-400 mb-4">Discover the stunning beauty of space with daily images and descriptions from NASA.</p>
                        <Link href="/modules/apod">
                            <button 
                                className="inline-block py-2 px-4 bg-slate-700 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-purple-950"
                                onClick={handleButtonClick}
                            >
                                Explore APOD
                            </button>
                        </Link>
                    </div>

                    {/* Asteroids NeoWs */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Asteroids NeoWs</h2>
                        <p className="text-gray-400 mb-4">Track near-Earth objects (NEOs) and their trajectories. Stay informed about potential asteroid risks!</p>
                        <Link href="/modules/neows">
                            <button 
                                className="inline-block py-2 px-4 bg-green-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-700 mt-8"
                                onClick={handleButtonClick}
                            >
                                Explore Asteroids
                            </button>
                        </Link>
                    </div>

                    {/* EARTH */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">NASA Earth Imagery</h2>
                        <p className="text-gray-400 mb-4">Get images of any part of earth by entering the longitude, latitude, and time.</p>
                        <Link href="/modules/earth">
                            <button 
                                className="inline-block py-2 px-4 bg-red-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-red-700 mt-8"
                                onClick={handleButtonClick}
                            >
                                Explore Earth
                            </button>
                        </Link>
                    </div>

                    {/* EONET (Natural Events) */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Earth Natural Events</h2>
                        <p className="text-gray-400 mb-4">Visualize natural events like wildfires, volcanic eruptions, and storms occurring on Earth.</p>
                        <Link href="/modules/eonet">
                            <button 
                                className="inline-block py-2 px-4 bg-yellow-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-yellow-700 mt-6"
                                onClick={handleButtonClick}
                            >
                                Explore Natural Events
                            </button>
                        </Link>
                    </div>

                    {/* EPIC (Earth Imaging) */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Earth from Space</h2>
                        <p className="text-gray-400 mb-4">View Earth from space with daily images captured by the DSCOVR satellite.</p>
                        <Link href="/modules/epic">
                            <button 
                                className="inline-block py-2 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-indigo-700 mt-6"
                                onClick={handleButtonClick}
                            >
                                Explore Earth Images
                            </button>
                        </Link>
                    </div>

                    {/* Mars Rover Photos */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Mars Rover Photos</h2>
                        <p className="text-gray-400 mb-4">Browse through the latest images from Mars rovers like Curiosity and Perseverance.</p>
                        <Link href="/modules/MarsR">
                            <button 
                                className="inline-block py-2 px-4 bg-purple-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-purple-700"
                                onClick={handleButtonClick}
                            >
                                Explore Mars Photos
                            </button>
                        </Link>
                    </div>

                    {/* InSight (Mars Weather) */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Mars Weather</h2>
                        <p className="text-gray-400 mb-4">Track the weather conditions on Mars, including temperature, wind speed, and atmospheric pressure.</p>
                        <Link href="/modules/MarsW">
                            <button 
                                className="inline-block py-2 px-4 bg-teal-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-teal-700"
                                onClick={handleButtonClick}
                            >
                                Explore Mars Weather
                            </button>
                        </Link>
                    </div>

                    {/* Exoplanet Exploration */}
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out">
                        <h2 className="text-2xl font-extrabold text-white mb-4">Exoplanet Exploration</h2>
                        <p className="text-gray-400 mb-4">Discover newly discovered exoplanets, their potential habitability, and more!</p>
                        <Link href="/modules/exop">
                            <button 
                                className="inline-block py-2 px-4 bg-orange-600 text-white rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-orange-700 mt-5"
                                onClick={handleButtonClick}
                            >
                                Explore Exoplanets
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}
