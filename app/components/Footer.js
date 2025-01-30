import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-black via-slate-900 to-blue-900 text-white py-6">
            <div className="container mx-auto px-6 text-center">
                <p className="text-lg">Explore the Wonders of Space & Earth</p>
                <div className="mt-4 flex justify-center space-x-6">
                    <Link href="/about" className="hover:text-gray-300">About</Link>
                    <Link href="/contact" className="hover:text-gray-300">Contact</Link>
                    <Link href="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
                </div>
                <p className="mt-4 text-sm">© 2025 NASA Explorer Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
