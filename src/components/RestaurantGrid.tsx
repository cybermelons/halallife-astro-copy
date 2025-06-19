import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingContainer from './LoadingContainer';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  address: string;
  image: string;
  deliveryTime: string;
  priceRange: string;
  isOpen: boolean;
}

const RestaurantGrid = () => {
  // Example loading state - in real app this would come from data fetching
  const [isLoading, setIsLoading] = useState(false);
  // Mock data for demonstration
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Kabul House",
      cuisine: "Afghan, Middle Eastern",
      rating: 4.8,
      reviews: 245,
      address: "123 Main St, New York, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "30-45 min",
      priceRange: "$$",
      isOpen: true
    },
    {
      id: 2,
      name: "Biryani Palace",
      cuisine: "Indian, Pakistani",
      rating: 4.6,
      reviews: 189,
      address: "456 Oak Ave, Brooklyn, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "25-40 min",
      priceRange: "$$$",
      isOpen: true
    },
    {
      id: 3,
      name: "Mediterranean Delights",
      cuisine: "Turkish, Mediterranean",
      rating: 4.9,
      reviews: 312,
      address: "789 Park Blvd, Queens, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "35-50 min",
      priceRange: "$$",
      isOpen: false
    },
    {
      id: 4,
      name: "Nile River Restaurant",
      cuisine: "Egyptian, Middle Eastern",
      rating: 4.7,
      reviews: 156,
      address: "321 River St, Manhattan, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "40-55 min",
      priceRange: "$$$",
      isOpen: true
    },
    {
      id: 5,
      name: "Spice Garden",
      cuisine: "Bangladeshi, Indian",
      rating: 4.5,
      reviews: 203,
      address: "654 Garden Way, Bronx, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "30-45 min",
      priceRange: "$",
      isOpen: true
    },
    {
      id: 6,
      name: "Al-Sham Sweets",
      cuisine: "Syrian, Lebanese",
      rating: 4.9,
      reviews: 428,
      address: "987 Sweet Lane, Staten Island, NY",
      image: "/assets/images/restaurant-placeholder.jpg",
      deliveryTime: "20-35 min",
      priceRange: "$$",
      isOpen: true
    }
  ];

  return (
    <LoadingContainer 
      isLoading={isLoading} 
      loadingMessage="Loading restaurants near you..."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <Card 
          key={restaurant.id} 
          className="overflow-hidden hovereffect cursor-pointer" 
          tabIndex={0}
          role="article"
          aria-label={`${restaurant.name} restaurant`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              console.log(`Navigate to ${restaurant.name}`);
            }
          }}
        >
          {/* Restaurant Image */}
          <div className="relative h-48 bg-gray-200">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            {!restaurant.isOpen && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Currently Closed</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
              <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Restaurant Name and Cuisine */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-secondary">{restaurant.name}</h3>
              <p className="text-sm text-text-secondary">{restaurant.cuisine}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold">{restaurant.rating}</span>
                <span className="text-sm text-text-secondary">({restaurant.reviews})</span>
              </div>
              <span className="text-sm text-text-secondary">• {restaurant.priceRange}</span>
            </div>

            {/* Address */}
            <p className="text-sm text-text-secondary mb-3 flex items-start gap-1">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {restaurant.address}
            </p>

            {/* Delivery Time */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {restaurant.deliveryTime}
              </span>
              <Button size="sm" variant={restaurant.isOpen ? "default" : "secondary"} disabled={!restaurant.isOpen}>
                Order Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </LoadingContainer>
  );
};

export default RestaurantGrid;