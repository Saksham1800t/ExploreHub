"use client";
import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

                {/* Your Contact Information */}
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 via-slate-800 to-slate-950 p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-blue-950 transition-all duration-300 ease-in-out">
                    <h3 className="text-3xl font-semibold mb-4">Contact Information</h3>
                    <p className="mb-4 text-lg">If you have any questions or need assistance, feel free to reach out to me directly.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Your Personal Details */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Personal Details</h4>
                            <ul className="list-none space-y-2">
                                <li><strong>Developer Name:</strong> Saksham Agarwal</li>
                                <li><strong>Mobile No.:</strong> 7088894066</li>
                                <li><strong>Gmail ID:</strong> <a href="mailto:sakshamagarwal0507@gmail.com" className="text-blue-400 hover:underline hover:text-blue-800">sakshamagarwal0507@gmail.com</a></li>
                                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saksham-agarwal-/" className="text-blue-400 hover:underline hover:text-blue-800">saksham-agarwal</a></li>
                                <li><strong>GitHub</strong> <a href="https://github.com/Saksham1800t" className="text-blue-400 hover:underline hover:text-blue-800">Saksham1800t</a></li>
                            </ul>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Useful Information</h4>
                            <p className="mb-4 text-lg">
                                Feel free to reach out if you have any inquiries about the website, need technical support, or want to know more about my services.
                            </p>
                            <ul className="list-none space-y-2">
                                <li><strong>Business Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</li>
                                <li><strong>Location:</strong> Currently working remotely from India.</li>
                                <li><strong>Support:</strong> For support, please email or call during business hours.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
