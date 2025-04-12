# Car Finder Web App

## Overview

The Car Finder Web App allows users to search for cars based on various filters such as brand, price range, fuel type, and seating capacity. Users can view detailed information about each car and add cars to their wishlist, which is saved in local storage. The application leverages the power of Next.js to provide a responsive and interactive user experience.

## Features

1. **Search for Cars**: Users can search cars based on filters like brand, price range, fuel type, and seating capacity.
2. **View Car Details**: Clicking on a car from the search results displays detailed information about the car.
3. **Wishlist**: Users can add cars to a wishlist, which is stored in LocalStorage and persists across sessions.
4. **API Integration**: Fetch car data from a provided or mock API.
5. **Responsive UI**: Built with a responsive design using TailwindCSS, ensuring usability across devices.
6. **Pagination**: Display search results in pages with 10 cars per page.
7. **Real-Time UI Updates**: The UI updates in real-time when filters or search queries change, providing a smooth user experience.
8. **Loading and Error Handling**: Display loading indicators while fetching data and handle errors gracefully.
9. **Dark Mode Toggle**: Users can toggle between light and dark themes.
10. **Sorting**: Users can sort cars by price (low to high, high to low).
11. **UI Animations**: Smooth transitions and animations for interactions.

## Technology Stack

- **Frontend Framework**: Next.js 
- **State Management**: `useState`, `useEffect` 
- **CSS Framework**: TailwindCSS 
- **Local Storage**: Used to store wishlist data


## Features Breakdown

### 1. Search for Cars

The search bar allows users to filter cars by brand, price range, fuel type, and seating capacity.

The filters are dynamically applied, and only relevant cars are shown in the results.

The user can also enter a keyword and search the details.

### 2. Car Details Page

Users can click on any car in the search results to view detailed information like specifications, features, and a larger image.

### 3. Wishlist

Cars can be added to the wishlist, which is stored in the browser’s LocalStorage.

The wishlist data persists across sessions, and users can remove cars from the wishlist as well.

The user can also view the cars added in wishlist in the Wishlist page.

### 4. Pagination

The search results are paginated to show only 10 cars per page, reducing page load time and improving the user experience.

### 5. Real-Time UI Updates

When the user interacts with filters or modifies the search query, the UI updates in real-time without needing to reload the page.

### 6. API Integration

Fetch car data from an external API using Next.js API routes.

Display a loading state while fetching data and handle any errors gracefully with appropriate messages.

### 7. Dark Mode Toggle 

The user can toggle between light and dark themes for better accessibility and preference.

### 8. Sorting 

Users can sort the car results based on price, either from low to high or high to low.

### 9. UI Animations 

Smooth animations are applied when adding/removing cars from the wishlist or when interacting with the UI elements.

## LocalStorage Implementation

The app uses LocalStorage to store the wishlist data. The following functions are provided for managing wishlist items:

**Add to Wishlist:** Adds a car to the wishlist and updates LocalStorage.

**Remove from Wishlist:** Removes a car from the wishlist and updates LocalStorage.

**Fetch Wishlist:** Retrieves the wishlist from LocalStorage when the app is loaded.

## API Routes

The API is set up using Next.js API routes for fetching car data. It handles parameters such as brand, price, fuel type, and seating capacity to filter the data before returning the response.

## Deployed Application

Check out the live version of the app here: [Car Finder](https://localhost:3000/)
