"use client";

import { useState, useEffect } from "react";
import herobackground from "../assets/background.png";
import { getAllMakes, getCars, getFuelTypeDetails, getMinMaxPrice, getSeatingCapacity } from "@/api/carApi";
import CarCard from "@/components/CarCard";
import { Car, Make, PriceRange, SeatingCapacity, FuelType } from "@/utils/carInterface";

export default function Home() {
  const [price, setPrice] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [seating, setSeating] = useState<SeatingCapacity[]>([]);
  const [fuel, setFuel] = useState<FuelType[]>([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const filters: Record<string, string | number> = {};

      if (brand) filters.make = brand;
      if (fuelType) filters.fuelType = fuelType;
      if (seatingCapacity) filters.seatingCapacity = seatingCapacity;
      if (keyword) filters.keyword = keyword;
      if (price) {
        filters.minPrice = 1000;
        filters.maxPrice = price;
      }
      filters.sortOrder = sortOrder;
      const filteredCars = await getCars(filters, page, pageSize);
      setCars(filteredCars.data);
      setTotalPages(filteredCars.totalPages);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMakes = async () => {
    try {
      setIsLoading(true);
      const getMakes = await getAllMakes();
      if (getMakes) {
        setMakes(getMakes.data);
      }
    } catch (error) {
      console.log("Error", JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      const getPrice = await getMinMaxPrice();
      if (getPrice) {
        setPriceRange(getPrice.data);
      }
    } catch (error) {
      console.log("Error", JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPSeatingCapacity = async () => {
    try {
      setIsLoading(true);
      const getSeating = await getSeatingCapacity();
      if (getSeating) {
        setSeating(getSeating.data);
      }
    } catch (error) {
      console.log("Error", JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFuelType = async () => {
    try {
      setIsLoading(true);
      const getFuelType = await getFuelTypeDetails();
      if (getFuelType) {
        setFuel(getFuelType.data);
      }
    } catch (error) {
      console.log("Error", JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchMakes();
    fetchPrice();
    fetchPSeatingCapacity();
    fetchFuelType();
  }, [sortOrder, page]);

  const handleSearch = () => {
    setPage(1);
    fetchCars();
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <div className="container mx-auto">

          {isLoading && (
            <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-800">
              <div className="loader"></div>
            </div>
          )}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-4 h-[600px]"
            style={{
              backgroundImage: `url(${herobackground.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-start md:w-1/2 space-y-8 bg-opacity-75 p-4 rounded-lg">
              <h1 className="text-pretty font-semibold text-white mb-4">
                Uncover Your Next Ride
              </h1>
              <h2 className="text-4xl font-bold text-white font-sans">
                Find Your Perfect Car
              </h2>
              <button
                className="text-gray-600 font-sans hover:text-[#333] hover:cursor-pointer font-medium bg-white py-2 px-2 rounded-md shadow-lg w-[170px] h-[53px]"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Search for Cars
              </h2>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search cars (e.g., SUV, Honda)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-300"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium mb-2">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Brand</option>
                    {makes.map((brandItem) => (
                      <option key={brandItem.id} value={brandItem.name}>
                        {brandItem.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium mb-2">Price Range</label>
                  <span className="text-[#405FF2] font-bold mb-2">
                    ₹{price.toLocaleString()}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={priceRange?.maxPrice || 0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium mb-2">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Fuel Type</option>
                    {fuel.map((fuelItem) => (
                      <option key={fuelItem.id} value={fuelItem.type}>
                        {fuelItem.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium mb-2">Seating Capacity</label>
                  <select
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Capacity</option>
                    {seating.map((capacityItem) => (
                      <option key={capacityItem.id} value={capacityItem.capacity}>
                        {capacityItem.capacity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <label className="text-gray-600 font-medium mb-2">Sort by Price </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Search Cars
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        {isLoading && (
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-800">
            <div className="loader"></div>
          </div>
        )} */}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 mx-12 my-12">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-indigo-500 text-white py-2 px-6 rounded-full disabled:opacity-50 dark:bg-indigo-700 dark:disabled:bg-indigo-900"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 mx-2 rounded 
        ${page === index + 1
                  ? "bg-indigo-500 text-white dark:bg-indigo-700 dark:text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-indigo-500 text-white py-2 px-6 rounded-full disabled:opacity-50 dark:bg-indigo-700 dark:disabled:bg-indigo-900"
          >
            Next
          </button>
        </div>

      </main>
    </div>
  );
}


