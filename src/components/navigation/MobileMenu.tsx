
import React from "react";
import UserMenu from "@/components/navigation/UserMenu";
import { Link } from "react-router-dom";

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                    to="/movies/popular"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Movies
                </Link>
                <Link
                    to="/series/popular"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Series
                </Link>
                <Link
                    to="/search"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Advanced Search
                </Link>
                <Link
                    to="/lists"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Lists
                </Link>
                <UserMenu
                    isMobile={true}
                    closeMenu={toggleMenu}
                    isDropdownOpen={false}
                    toggleDropdown={() => {}}
                />
            </div>
        </div>
    );
};

export default MobileMenu;