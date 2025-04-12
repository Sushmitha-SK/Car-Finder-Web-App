import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { IoSpeedometerOutline, IoSettingsOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { PiSeatLight } from "react-icons/pi";
import { getWishlist, addToWishlist, removeFromWishlist } from "../utils/wishlistUtils";
import { Car } from "@/utils/carInterface";

const CarCard = ({ car }: { car: Car }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        setIsInWishlist(getWishlist().includes(car._id));
    }, [car._id]);

    const toggleWishlist = () => {
        const updatedWishlist = isInWishlist
            ? removeFromWishlist(car._id)
            : addToWishlist(car._id);

        console.log('wishlistinfo', updatedWishlist)
        setIsInWishlist(!isInWishlist);
        window.dispatchEvent(new Event("wishlistUpdate"));
    };

    return (
        <div className="border border-[#E9E9E9] rounded-lg overflow-hidden hover:shadow-lg 
        transition-shadow duration-300 bg-white">
            <div className="relative">
                <img
                    src={car.imageUrl || "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"}
                    alt={`${car?.make || "Unknown"} ${car?.model || "Car"}`}
                    className="w-full h-60 object-cover"
                />
                <button
                    onClick={toggleWishlist}
                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full shadow-md ${isInWishlist ? "bg-red-500 text-white" : "bg-white text-gray-400"
                        }`}
                >
                    <FaHeart />
                </button>
            </div>

            <div className="p-4">
                <h2 className="text-lg font-bold">
                    {car?.make || "Unknown"} {car?.model || "Car"} — {car?.year || "N/A"}
                </h2>
                <p className="text-sm text-gray-500">{car?.description || "No description available."}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-1">
                        <IoSpeedometerOutline className="text-gray-400" />
                        {car?.mileage || "N/A"} Miles
                    </div>
                    <div className="flex items-center gap-1">
                        <IoSettingsOutline className="text-gray-400" />
                        {car?.fuelType || "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                        <IoSettingsOutline className="text-gray-400" />
                        {car?.transmission || "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                        <PiSeatLight className="text-gray-400" />
                        {car?.seatingCapacity || "N/A"} Seats
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-bold text-gray-800">₹{car?.price || "N/A"}</p>
                    <a
                        href={`/${car?._id}`}
                        className="flex items-center gap-1 text-blue-500 text-sm font-semibold hover:underline"
                    >
                        View Details <GoArrowUpRight className="text-sm" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
