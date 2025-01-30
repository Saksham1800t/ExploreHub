"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const EarthEvents = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]); // Store all the categories
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("newest"); // Default to "newest"

    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const apiUrl = `https://eonet.gsfc.nasa.gov/api/v3/events?api_key=${apiKey}`;

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eonet.gsfc.nasa.gov/api/v2.1/categories');
                setCategories(response.data.categories);
            } catch (error) {
                setError("Failed to fetch categories.");
            }
        };
        fetchCategories();
    }, []);

    // Fetch events data
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(apiUrl);
                setEvents(response.data.events);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch events.");
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter events based on selected category
    const filteredEvents = category === "all"
        ? events
        : events.filter(event =>
            event.categories.some(cat => cat.title.toLowerCase() === category.toLowerCase())
        );

    // Sort events based on the selected order (newest or oldest)
    const sortedEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(a.geometry[0].date);
        const dateB = new Date(b.geometry[0].date);

        return sortOrder === "newest"
            ? dateB - dateA // Newest first
            : dateA - dateB; // Oldest first
    });

    // Get only 5 events per page
    const eventsToDisplay = sortedEvents.slice((currentPage - 1) * 5, currentPage * 5);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-extrabold mb-6">Earth Natural Events</h1>

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
                    <p>Loading Events.....</p>
                </>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="flex items-center justify-between w-full max-w-4xl">
                        {/* Category Filter */}
                        <div className="mb-4">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="p-2 rounded-md bg-gray-700 text-white"
                            >
                                <option value="all">All Events</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.title.toLowerCase()}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="mb-4">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="p-2 rounded-md bg-gray-700 text-white"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    {/* Events List */}
                    <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-xl">
                        {eventsToDisplay.length === 0 ? (
                            <p>No events available.</p>
                        ) : (
                            eventsToDisplay.map((event) => (
                                <div key={event.id} className="mb-4 p-4 bg-gray-900 rounded-md shadow-md">
                                    <h2 className="text-xl font-bold">{event.title}</h2>
                                    <p className="text-gray-400">{event.description || "No description available."}</p>
                                    <p className="text-gray-500">Category: {event.categories.map(cat => cat.title).join(", ")}</p>
                                    <p className="text-gray-500">Date: {new Date(event.geometry[0].date).toLocaleDateString()}</p>

                                    {event.sources.length > 0 && (
                                        <a
                                            href={event.sources[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            More Info
                                        </a>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Load More Button */}
                    {eventsToDisplay.length < filteredEvents.length && (
                        <button
                            onClick={handleLoadMore}
                            className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out hover:bg-blue-700"
                        >
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default EarthEvents;
