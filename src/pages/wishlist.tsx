import { getWishlist } from '@/utils/wishlistUtils';
import React, { useState, useEffect, useMemo } from 'react';
import { getAllCarsList } from '@/api/carApi';
import CarCard from '@/components/CarCard';
import { Car } from '@/utils/carInterface';
import "@/app/globals.css";
import Header from '@/components/Header';

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlistCars();

  }, []);

  const fetchWishlistCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const carData = await getAllCarsList();
      const wishlistIds = getWishlist();

      if (carData?.data && Array.isArray(carData.data)) {
        const filteredCars = carData.data.filter((car: Car) =>
          wishlistIds.includes(car._id)
        );
        setWishlistCars(filteredCars);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to fetch cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const wishlistContent = useMemo(() => {
    if (loading) {
      return <p className="text-blue-500">Loading your wishlist...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (wishlistCars.length === 0) {
      return (
        <p className="text-gray-500">
          Your wishlist is empty. Start adding your favorite cars!
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

    );
  }, [loading, error, wishlistCars]);

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
          {wishlistContent}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
