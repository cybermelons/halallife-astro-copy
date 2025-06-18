import React from 'react';

const WhatIsHalal = () => {
  const principles = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Permissible Sources",
      description: "All meat must come from animals that are permissible to eat according to Islamic law"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Proper Processing",
      description: "Animals must be slaughtered according to Islamic guidelines with specific prayers"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "No Prohibited Items",
      description: "No pork, alcohol, or their derivatives in any form throughout the supply chain"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Clean & Pure",
      description: "All ingredients and preparation methods must maintain cleanliness and purity"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="sitewidth">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading mb-4">What is Halal?</h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Halal is an Arabic term meaning "permissible" or "lawful" according to Islamic law. 
            When it comes to food, halal certification ensures that products meet strict dietary guidelines.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {principles.map((principle, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cuisinecard text-primary rounded-full mb-4">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{principle.title}</h3>
              <p className="text-text-secondary">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            Why Choose Halal-Certified Restaurants?
          </h3>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            When you dine at halal-certified restaurants, you can be confident that your food 
            meets the highest standards of quality, cleanliness, and religious compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="btn-primary">
              Find Halal Restaurants
            </a>
            <a href="#" className="btn-secondary">
              Learn About Certification
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsHalal;