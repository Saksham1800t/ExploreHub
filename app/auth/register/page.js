"use client";
import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); 

        if (!formData.username || !formData.email || !formData.password) {
            setMessage("All fields are required!");
            setAlertType("error");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.status === 201) {
                setMessage("Registration successful! Redirecting...");
                setAlertType("success");

                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1500);
            } else {
                setMessage(data.message || "Registration failed. Please try again.");
                setAlertType("error");
            }
        } catch (error) {
            setMessage("Something went wrong! Please try again later.");
            setAlertType("error");
        }
    };

    return (
        <div className="min-h-[31rem] bg-black flex items-center justify-center p-6 text-black">
            <div className="w-full max-w-lg p-6 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-950 shadow-2xl shadow-blue-500/50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-black text-center text-white">Sign Up</h2>

                {message && (
                    <div
                        className={`flex justify-between items-center p-4 mb-4 text-white rounded-md ${alertType === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        <span>{message}</span>
                        <button onClick={() => setMessage("")} className="text-white font-bold px-2">✖</button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full mb-4 px-4 py-2 border rounded-md text-black"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mb-4 px-4 py-2 border rounded-md text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full mb-4 px-4 py-2 border rounded-md text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md border border-slate-300 py-2 px-4 text-center text-lg transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
