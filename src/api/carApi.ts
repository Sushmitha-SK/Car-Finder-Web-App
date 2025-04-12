import axios from 'axios';
import api from './endPoint';

//Get All cars
export async function getCars(filters = {}, page = 1, pageSize = 10) {
    const url = `${api.baseApi}/api/car/cars/search`;
    try {
        const queryParams = new URLSearchParams({
            ...filters,
            page: page.toString(),
            pageSize: pageSize.toString(),
        }).toString();

        const response = await axios.get(`${url}?${queryParams}`);

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}

//Get Car Details By ID
export async function getCarDetails(carId: string) {
    const url = `${api.baseApi}/api/car/details/${carId}`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}


//Get All Cars
export async function getAllCarsList() {
    const url = `${api.baseApi}/api/car/cars`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}

//Get All Makes
export async function getAllMakes() {
    const url = `${api.baseApi}/api/car/makes`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}


//Get All price-range
export async function getMinMaxPrice() {
    const url = `${api.baseApi}/api/car/price-range`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}

//Get All Seating capacity
export async function getSeatingCapacity() {
    const url = `${api.baseApi}/api/car/seating`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}

//Get Fuel TYpe
export async function getFuelTypeDetails() {
    const url = `${api.baseApi}/api/car/fuelTypes`;
    try {
        const response = await axios.get(url, {
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
    }
}