
import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import DarkModeToggle from "@/components/DarkModeToggle";
import SearchBar from "@/components/navigation/SearchBar.tsx";
import UserMenu from "@/components/navigation/UserMenu";
import MobileMenu from "@/components/navigation/MobileMenu";
import MobileSearchBar from "@/components/navigation/MobileSearchBar";

const Navbar = ({ isFilterOpen = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
    const toggleUserDropdown = useCallback(() => setIsUserDropdownOpen((prev) => !prev), []);

    return (
        <nav className="bg-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white font-bold text-lg">
                                WatchHub
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-6 flex items-baseline space-x-2">
                                <Link
                                    to="/movies/popular"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Movies
                                </Link>
                                <Link
                                    to="/series/popular"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Series
                                </Link>
                                <Link
                                    to="/search"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Advanced Search
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-2 ml-4">
                        <SearchBar />
                    </div>
                    <Link
                        to="/lists"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white ml-2 px-3 py-2 rounded-md text-sm font-medium hidden md:block"
                    >
                        Lists
                    </Link>
                    <div className="hidden md:block ml-2" ref={userDropdownRef}>
                        <UserMenu
                            isDropdownOpen={isUserDropdownOpen}
                            toggleDropdown={toggleUserDropdown}
                        />
                    </div>
                    <div className="hidden md:block ml-3">
                        <DarkModeToggle />
                    </div>
                    <div className={`md:hidden flex items-center ${isFilterOpen ? "hidden" : ""}`}>
                        <div className="mr-2">
                            <DarkModeToggle />
                        </div>
                        <MobileSearchBar />
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <MdClose className="block h-6 w-6" />
                            ) : (
                                <MdMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </nav>
    );
};

export default Navbar;