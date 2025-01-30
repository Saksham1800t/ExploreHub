"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newUser, setNewUser] = useState({ username: "", email: "" });
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            router.push("/auth/login");
        } else {
            setUser(storedUser);
            setNewUser(storedUser);
        }
    }, []);

    if (!user) return null;

    const handleEdit = () => setEditing(true);
    
    const handleCancel = () => {
        setNewUser(user);
        setEditing(false);
        setMessage(""); 
    };

    const handleSave = async () => {
        try {
            setMessage(""); 
            const token = localStorage.getItem("authToken");
            if (!token) {
                router.push("/auth/login");
                return;
            }

            const res = await fetch("/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (res.status === 200) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setEditing(false);
                setMessage("Profile updated successfully!");
                setAlertType("success");
            } else {
                setMessage(data.message || "Failed to update profile");
                setAlertType("error");
            }
        } catch (error) {
            console.error("Update failed:", error);
            setMessage("Error updating profile. Please try again later.");
            setAlertType("error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-black">
            <div className="w-full max-w-md bg-gradient-to-r from-gray-900 via-slate-950 to-black p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-pink-900 transition-all duration-300 ease-in-out p-6 text-center">
                
                {message && (
                    <div className={`p-4 mb-4 text-white rounded-md ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}>
                        {message}
                        <button onClick={() => setMessage("")} className="ml-2 font-bold text-white">✖</button>
                    </div>
                )}

                <div className="mb-4">
                    <img
                        src="/noImage.jpg"
                        alt="Profile"
                        className="w-24 h-24 mx-auto rounded-full border-4 border-gray-200"
                    />
                </div>
                <h2 className="text-xl font-semibold text-gray-200">{user?.username}</h2>
                <p className="text-white">{user?.email}</p>

                {editing ? (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md mb-2"
                        />
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md mb-2"
                        />
                        <div className="flex justify-center space-x-4 mt-2">
                            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Save
                            </button>
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleEdit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Edit Profile
                    </button>
                )}

                <button onClick={handleLogout} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
