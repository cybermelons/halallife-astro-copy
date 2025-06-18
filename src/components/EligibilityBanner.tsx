import React from 'react';
import { Button } from '@/components/ui/button';

const EligibilityBanner = () => {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="sitewidth">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Are You a Restaurant Owner?
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Join thousands of halal restaurants reaching millions of customers. 
                Get verified and grow your business with GoHalalLife.
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary">Free halal certification verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary">Reach targeted halal-conscious customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary">Boost your online presence and reviews</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-semibold">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="font-semibold">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-text-secondary">Verified Restaurants</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-sm text-text-secondary">Monthly Visitors</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-sm text-text-secondary">Average Rating</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-text-secondary">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityBanner;