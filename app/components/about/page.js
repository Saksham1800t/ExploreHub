"use client";
import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-4xl font-bold text-center mb-8">About ExploreHub</h2>

                {/* ExploreHub Overview */}
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 via-slate-800 to-slate-950 p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-blue-950 transition-all duration-300 ease-in-out">
                    <h3 className="text-3xl font-semibold mb-4">ExploreHub Overview</h3>
                    <p className="mb-4 text-lg">
                        ExploreHub is a centralized dashboard that brings together the wonders of space, Earth, and planetary exploration. It provides access to real-time data, images, and information about various celestial bodies, space missions, and natural events on Earth.
                    </p>
                    <p className="mb-4 text-lg">
                        Whether you're interested in daily images of space, tracking near-Earth asteroids, or exploring the latest Mars rover photos, ExploreHub offers an interactive experience for all space enthusiasts and researchers.
                    </p>
                </div>

                {/* Key Features */}
                <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 via-slate-800 to-slate-950 p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-blue-950 transition-all duration-300 ease-in-out">
                    <h3 className="text-3xl font-semibold mb-4">Features of ExploreHub</h3>
                    <p className="mb-4 text-lg">
                        ExploreHub includes various tools and resources to help you explore space and Earth in new and exciting ways. Here are some of the key features:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* List of Features */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Astronomy Picture of the Day</h4>
                            <p className="text-lg mb-4">
                                Discover the stunning beauty of space with daily images and descriptions from NASA.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">Asteroids NeoWs</h4>
                            <p className="text-lg mb-4">
                                Track near-Earth objects (NEOs) and their trajectories. Stay informed about potential asteroid risks!
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">NASA Earth Imagery</h4>
                            <p className="text-lg mb-4">
                                Get images of any part of Earth by entering the longitude, latitude, and time.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">Earth Natural Events</h4>
                            <p className="text-lg mb-4">
                                Visualize natural events like wildfires, volcanic eruptions, and storms occurring on Earth.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">Mars Rover Photos</h4>
                            <p className="text-lg mb-4">
                                Browse through the latest images from Mars rovers like Curiosity and Perseverance.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">Mars Weather</h4>
                            <p className="text-lg mb-4">
                                Track the weather conditions on Mars, including temperature, wind speed, and atmospheric pressure.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-2">Exoplanet Exploration</h4>
                            <p className="text-lg mb-4">
                                Discover newly discovered exoplanets, their potential habitability, and more!
                            </p>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default About;
