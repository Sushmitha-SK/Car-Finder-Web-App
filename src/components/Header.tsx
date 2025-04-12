"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoCarSportOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { getWishlist } from "../utils/wishlistUtils";

export default function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };


  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlist().length);
    };
    window.addEventListener("wishlistUpdate", handleWishlistUpdate);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    return () => {
      window.removeEventListener("wishlistUpdate", handleWishlistUpdate);
    };
  }, []);



  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-none transition-all duration-300">
      <nav className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-3xl font-sans font-bold flex items-center text-gray-900 dark:text-white">
          <IoCarSportOutline className="mr-2 text-[#050B20] dark:text-white transition-all duration-300" />
          Car Finder
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/wishlist" className="relative group">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-red-100 dark:bg-gray-800 dark:hover:bg-red-300 transition-colors duration-200">
              <FaHeart className="text-xl text-primaryColor dark:text-white group-hover:scale-125 transition-transform duration-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-[2px] shadow-md">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <MdOutlineLightMode className="text-2xl text-yellow-400 transition-all duration-300" />
            ) : (
              <MdOutlineDarkMode className="text-2xl text-gray-600 dark:text-white transition-all duration-300" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

