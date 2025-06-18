import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Cuisine {
  id: number;
  name: string;
  count: number;
  image: string;
  color: string;
}

const CuisineCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cuisines: Cuisine[] = [
    { id: 1, name: 'Mediterranean', count: 156, image: '/assets/images/cuisine-mediterranean.jpg', color: 'bg-blue-50' },
    { id: 2, name: 'Indian', count: 243, image: '/assets/images/cuisine-indian.jpg', color: 'bg-orange-50' },
    { id: 3, name: 'Middle Eastern', count: 189, image: '/assets/images/cuisine-middle-eastern.jpg', color: 'bg-yellow-50' },
    { id: 4, name: 'Pakistani', count: 134, image: '/assets/images/cuisine-pakistani.jpg', color: 'bg-green-50' },
    { id: 5, name: 'Turkish', count: 98, image: '/assets/images/cuisine-turkish.jpg', color: 'bg-red-50' },
    { id: 6, name: 'Bangladeshi', count: 76, image: '/assets/images/cuisine-bangladeshi.jpg', color: 'bg-purple-50' },
    { id: 7, name: 'Egyptian', count: 54, image: '/assets/images/cuisine-egyptian.jpg', color: 'bg-indigo-50' },
    { id: 8, name: 'Malaysian', count: 89, image: '/assets/images/cuisine-malaysian.jpg', color: 'bg-pink-50' },
  ];

  const [itemsPerView, setItemsPerView] = useState(4);
  const maxIndex = Math.max(0, cuisines.length - itemsPerView);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const scrollTo = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * (100 / itemsPerView);
      carouselRef.current.style.transform = `translateX(-${scrollAmount}%)`;
    }
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    const newIndex = Math.max(0, currentIndex - 1);
    scrollTo(newIndex);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollTo(newIndex);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="sitewidth">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="heading mb-2">Popular Cuisines Near You</h2>
            <p className="text-lg text-text-secondary">Explore restaurants by cuisine type</p>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-full"
              aria-label="Previous cuisines"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
              aria-label="Next cuisines"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {cuisines.map((cuisine) => (
              <div 
                key={cuisine.id} 
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3"
              >
                <a 
                  href={`/cuisines/${cuisine.name.toLowerCase()}`}
                  className="block group cursor-pointer"
                >
                  <div className={`${cuisine.color} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                    {/* Cuisine Icon/Image */}
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-3xl">🍽️</span>
                    </div>
                    
                    {/* Cuisine Info */}
                    <h3 className="text-xl font-bold text-center text-secondary mb-2">
                      {cuisine.name}
                    </h3>
                    <p className="text-center text-text-secondary">
                      {cuisine.count} Restaurants
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                scrollTo(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button size="lg" variant="outline">
            View All Cuisines
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CuisineCarousel;