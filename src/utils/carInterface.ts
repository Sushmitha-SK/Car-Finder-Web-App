export interface Make {
  id: number;
  name: string;
}

export interface SeatingCapacity {
  id: number;
  capacity: number;
}

export interface FuelType {
  id: number;
  type: string;
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  mileage: number;
  transmission: string;
  description: string;
  dateAdded: string;
  bodyType: string;
  location: string;
  imageUrl: string;
}


export interface CarProps {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  description: string;
  imageUrl: string;
}