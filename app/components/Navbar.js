"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className="bg-gradient-to-t from-black via-slate-900 to-blue-900 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/">
                    <img src="/logoT1.png" alt="Explorehub" className="w-[10rem] h-[2rem]" />
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link href="/">
                        <p className="hover:text-gray-300">Home</p>
                    </Link>
                    <Link href="/components/profile">
                        <p className="hover:text-gray-300">Profile</p>
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link href="/auth/login">
                                <p className="hover:text-gray-300">Login</p>
                            </Link>
                            <Link href="/auth/register">
                                <p className="hover:text-gray-300">Sign Up</p>
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gradient-to-t from-black via-slate-900 to-blue-950 text-white px-6 py-4">
                    <div className="flex flex-col space-y-4">
                        <Link href="/">
                            <p className="hover:text-gray-300">Home</p>
                        </Link>
                        <Link href="/components/profile">
                            <p className="hover:text-gray-300">Profile</p>
                        </Link>
                        {!isLoggedIn ? (
                            <>
                                <Link href="/auth/login">
                                    <p className="hover:text-gray-300">Login</p>
                                </Link>
                                <Link href="/auth/register">
                                    <p className="hover:text-gray-300">Sign Up</p>
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
