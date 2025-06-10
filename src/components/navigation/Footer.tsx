import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'TV Shows', path: '/series' },
        { name: 'Search', path: '/search' },
    ];

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4">WatchHub</h3>
                    <p className="text-sm text-center mb-6">Your ultimate destination for movies and TV shows.</p>
                    <nav className="mb-6">
                        <ul className="flex flex-wrap justify-center">
                            {quickLinks.map((link, index) => (
                                <li key={link.name} className="mx-2 my-1">
                                    <Link
                                        to={link.path}
                                        className="hover:text-gray-300 transition-colors duration-200 ease-in-out"
                                    >
                                        {link.name}
                                    </Link>
                                    {index < quickLinks.length - 1 && (
                                        <span className="ml-2 text-gray-500">•</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} WatchHub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;