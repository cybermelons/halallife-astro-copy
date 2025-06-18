import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Understanding Halal Certification Standards',
      excerpt: 'Learn about the different halal certification bodies and what makes food truly halal-compliant.',
      author: 'Sarah Ahmed',
      date: 'Dec 15, 2023',
      readTime: '5 min read',
      image: '/assets/images/blog-1.jpg',
      category: 'Education'
    },
    {
      id: 2,
      title: 'Top 10 Halal Restaurants in New York',
      excerpt: 'Discover the best halal dining experiences NYC has to offer, from street food to fine dining.',
      author: 'Mohamed Khan',
      date: 'Dec 12, 2023',
      readTime: '3 min read',
      image: '/assets/images/blog-2.jpg',
      category: 'Food Guide'
    },
    {
      id: 3,
      title: 'Halal Food Trends for 2024',
      excerpt: 'Explore emerging trends in the halal food industry and what to expect in the coming year.',
      author: 'Fatima Ali',
      date: 'Dec 10, 2023',
      readTime: '4 min read',
      image: '/assets/images/blog-3.jpg',
      category: 'Trends'
    },
    {
      id: 4,
      title: 'The Rise of Halal Fast Food Chains',
      excerpt: 'How major fast food brands are adapting to serve the growing halal consumer market.',
      author: 'Ahmad Hassan',
      date: 'Dec 8, 2023',
      readTime: '6 min read',
      image: '/assets/images/blog-4.jpg',
      category: 'Industry'
    }
  ];

  const itemsPerView = 3;
  const maxIndex = Math.max(0, blogPosts.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="sitewidth">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading mb-4">
            Check out our blogs for insightful guidance on Halal Food
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Stay informed about halal dining, certification standards, and the latest trends in the halal food industry.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {blogPosts.map((post) => (
                <div key={post.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    {/* Blog Image */}
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      {/* Blog Meta */}
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      {/* Blog Title */}
                      <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Blog Excerpt */}
                      <p className="text-text-secondary mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full" />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <a 
                          href={`/blog/${post.id}`}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Read More →
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-3 transition-opacity ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
            aria-label="Previous blogs"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-3 transition-opacity ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
            aria-label="Next blogs"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg">
            View All Blogs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;