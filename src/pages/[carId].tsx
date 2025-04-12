"use client";

import { getCarDetails } from '@/api/carApi';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCar, FaGasPump, FaHeart, FaMapMarkerAlt, FaRoad, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { IoIosPricetags } from "react-icons/io";
import '@/app/globals.css';
import { getWishlist} from "../utils/wishlistUtils";
import { Car } from '@/utils/carInterface';

const CarDetails = () => {
  const router = useRouter();
  const { carId } = router.query as { carId: string };

  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (carId) {
      getCarFullDetails();
    }
  }, [carId]);

  useEffect(() => {
    if (carDetails) {
      setIsInWishlist(getWishlist().includes(carDetails._id));
    }
  }, [carDetails]);

  const getCarFullDetails = async () => {
    const getData = await getCarDetails(carId);
    if (getData) {
      setCarDetails(getData.data);
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  if (!carDetails) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen  dark:bg-gray-900">
      <main className="flex-grow">
        <Header />
        <nav className="bg-gray-100 py-2 px-4 dark:bg-gray-800">
          <button
            onClick={() => router.back()}
            className="text-primaryColor font-semibold hover:underline dark:text-white"
          >
            &larr; Back
          </button>
        </nav>
        <div className="flex justify-center items-center py-8 px-8 bg-gray-100 min-h-screen dark:bg-gray-900">
          <div className="max-w-xl-7 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <div className="relative">
              <img
                src={carDetails.imageUrl}
                alt={carDetails.make + ' ' + carDetails.model}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md ${isInWishlist ? "bg-red-500 text-white" : "bg-white text-gray-400 dark:bg-gray-800 dark:text-white"}`}
              >
                <FaHeart className="text-lg" />
              </button>
            </div>
            <div className="p-6 flex flex-col justify-between text-gray-800 dark:text-white">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  {carDetails.make} {carDetails.model} ({carDetails.year})
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex items-start gap-2">
                  {carDetails.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <IoIosPricetags className="text-xl" />
                    <div>
                      <span className="font-semibold">Price:</span>
                      <span className="text-gray-800 dark:text-gray-200"> ₹{carDetails.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRoad className="text-xl" />
                    <div>
                      <span className="font-semibold">Mileage:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.mileage} miles</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGasPump className="text-xl" />
                    <div>
                      <span className="font-semibold">Fuel Type:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.fuelType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar className="text-xl" />
                    <div>
                      <span className="font-semibold">Transmission:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.transmission}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar className="text-xl" />
                    <div>
                      <span className="font-semibold">Body Type:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.bodyType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-xl" />
                    <div>
                      <span className="font-semibold">Location:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-xl" />
                    <div>
                      <span className="font-semibold">Seating Capacity:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {carDetails.seatingCapacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-xl" />
                    <div>
                      <span className="font-semibold">Date Added:</span>
                      <span className="text-gray-800 dark:text-gray-200"> {new Date(carDetails.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
