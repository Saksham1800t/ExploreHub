"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal"; // For modal functionality

const ExoplanetExplorer = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [radiusFilter, setRadiusFilter] = useState('all');
    const [gravityFilter, setGravityFilter] = useState('all');
    const [massFilter, setMassFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all'); // Planet/Moon filter

    // Earth values for comparison
    const EARTH_RADIUS = 6371; // in km
    const EARTH_GRAVITY = 9.81; // in m/s²
    const EARTH_MASS = 5.972 * Math.pow(10, 24); // in kg

    // Example: Fetch Exoplanet data from an API (NASA Exoplanet Archive or similar)
    const fetchExoplanets = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&filter[]=isKnown,eq,true");
            const data = await response.json();
            setExoplanets(data.bodies);
        } catch (error) {
            console.error("Error fetching exoplanet data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExoplanets();
    }, []);

    // Filter exoplanets by radius, gravity, mass, and type (planet/moon)
    const filteredExoplanets = exoplanets.filter((planet) => {
        // Type Filter (Planet or Moon)
        if (typeFilter === 'planet' && !planet.isPlanet) {
            return false;
        }
        if (typeFilter === 'moon' && planet.isPlanet) {
            return false;
        }

        // Radius Filter
        if (radiusFilter === 'larger' && planet.meanRadius <= EARTH_RADIUS) {
            return false;
        }
        if (radiusFilter === 'smaller' && planet.meanRadius >= EARTH_RADIUS) {
            return false;
        }
        if (radiusFilter === 'same' && (planet.meanRadius < EARTH_RADIUS * 0.9 || planet.meanRadius > EARTH_RADIUS * 1.1)) {
            return false;
        }

        // Gravity Filter
        if (gravityFilter === 'larger' && planet.gravity <= EARTH_GRAVITY) {
            return false;
        }
        if (gravityFilter === 'smaller' && planet.gravity >= EARTH_GRAVITY) {
            return false;
        }
        if (gravityFilter === 'same' && (planet.gravity < EARTH_GRAVITY * 0.9 || planet.gravity > EARTH_GRAVITY * 1.1)) {
            return false;
        }

        // Mass Filter
        if (massFilter === 'larger' && planet.mass?.massValue * Math.pow(10, planet.mass?.massExponent) <= EARTH_MASS) {
            return false;
        }
        if (massFilter === 'smaller' && planet.mass?.massValue * Math.pow(10, planet.mass?.massExponent) >= EARTH_MASS) {
            return false;
        }
        if (massFilter === 'same' && (planet.mass?.massValue * Math.pow(10, planet.mass?.massExponent) < EARTH_MASS * 0.9 || planet.mass?.massValue * Math.pow(10, planet.mass?.massExponent) > EARTH_MASS * 1.1)) {
            return false;
        }

        return true;
    });

    // Handle card click to show details
    const handleCardClick = (planet) => {
        setSelectedPlanet(planet);
    };

    // Handle modal close
    const closeModal = () => {
        setSelectedPlanet(null);
    };

    return (
        <div className="p-5 min-h-screen bg-black">
            <h1 className="text-4xl font-bold mb-5 text-center text-white">Explore Planets and Moons</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                {/* Type Filter (Planet or Moon) */}
                <div>
                    <label className="mr-2 text-white">Type</label>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                    >
                        <option value="all">All</option>
                        <option value="planet">Planet</option>
                        <option value="moon">Moon</option>
                    </select>
                </div>

                {/* Radius Filter */}
                <div>
                    <label className="mr-2 text-white">Radius</label>
                    <select
                        value={radiusFilter}
                        onChange={(e) => setRadiusFilter(e.target.value)}
                        className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                    >
                        <option value="all">All</option>
                        <option value="larger">Larger than Earth</option>
                        <option value="smaller">Smaller than Earth</option>
                        <option value="same">Same as Earth</option>
                    </select>
                </div>

                {/* Gravity Filter */}
                <div>
                    <label className="mr-2 text-white">Gravity</label>
                    <select
                        value={gravityFilter}
                        onChange={(e) => setGravityFilter(e.target.value)}
                        className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                    >
                        <option value="all">All</option>
                        <option value="larger">Larger than Earth</option>
                        <option value="smaller">Smaller than Earth</option>
                        <option value="same">Same as Earth</option>
                    </select>
                </div>

                {/* Mass Filter */}
                <div>
                    <label className="mr-2 text-white">Mass</label>
                    <select
                        value={massFilter}
                        onChange={(e) => setMassFilter(e.target.value)}
                        className="p-2 bg-gray-800 text-white rounded-md shadow-md"
                    >
                        <option value="all">All</option>
                        <option value="larger">Larger than Earth</option>
                        <option value="smaller">Smaller than Earth</option>
                        <option value="same">Same as Earth</option>
                    </select>
                </div>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <>
                    <div className="box-of-star1">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star2">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star3">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star4">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div data-js="astro" className="astronaut">
                        <div className="head"></div>
                        <div className="arm arm-left"></div>
                        <div className="arm arm-right"></div>
                        <div className="body">
                            <div className="panel"></div>
                        </div>
                        <div className="leg leg-left"></div>
                        <div className="leg leg-right"></div>
                        <div className="schoolbag"></div>
                    </div>
                    <p className="text-center" >Loading Planets or Moons.......</p>
                </>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredExoplanets.map((planet, index) => (
                        <div
                            key={index}
                            className="border p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
                            onClick={() => handleCardClick(planet)}
                        >
                            {/* Planet Name and Basic Details */}
                            <h2 className="text-xl font-semibold mb-2 text-white">{planet.englishName || planet.name}</h2>
                            <p><strong className="text-white">Mass:</strong> {planet.mass?.massValue * Math.pow(10, planet.mass?.massExponent)} kg</p>
                            <p><strong className="text-white">Radius:</strong> {planet.meanRadius} km</p>
                            <p><strong className="text-white">Gravity:</strong> {planet.gravity} m/s²</p>
                            <p><strong className="text-white">Sideral Orbit:</strong> {planet.sideralOrbit} days</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for full details */}
            {selectedPlanet && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-white">
                    <div className="bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out p-8 max-w-3xl mx-auto rounded-lg shadow-lg transition-all transform scale-105 hover:scale-100 ease-in-out duration-300">
                        <h2 className="text-3xl font-semibold mb-4 text-center">{selectedPlanet?.englishName}</h2>

                        <div className="space-y-4">
                            <p className="text-lg">
                                <strong className="font-semibold">Mass:</strong>{" "}
                                {selectedPlanet?.mass?.massValue * Math.pow(10, selectedPlanet?.mass?.massExponent)} kg
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Radius:</strong> {selectedPlanet?.meanRadius} km
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Gravity:</strong> {selectedPlanet?.gravity} m/s²
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Orbit Period:</strong> {selectedPlanet?.sideralOrbit} days
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Axial Tilt:</strong> {selectedPlanet?.axialTilt}°
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Avg Temperature:</strong> {selectedPlanet?.avgTemp}°C
                            </p>
                            <p className="text-lg">
                                <strong className="font-semibold">Inclination:</strong> {selectedPlanet?.inclination}°
                            </p>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExoplanetExplorer;
