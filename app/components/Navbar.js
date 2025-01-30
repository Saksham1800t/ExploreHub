"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
                  <img src="/logoT1.png" alt="Explorehub" className='w-[10rem] h-[2rem]'/>
                </Link>
                <div className="flex space-x-6">
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
        </nav>
    );
};

export default Navbar;
