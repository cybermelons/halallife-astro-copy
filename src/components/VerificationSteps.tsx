import React, { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const VerificationSteps = () => {
  const [openStep, setOpenStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Restaurant Application',
      description: 'Restaurants submit their halal certification documents and business information through our secure portal. We verify ownership and collect initial documentation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Certification Verification',
      description: 'Our team verifies the authenticity of halal certificates with issuing authorities. We check expiration dates and ensure compliance with recognized halal standards.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'On-Site Inspection',
      description: 'For selected restaurants, we conduct on-site visits to verify halal practices, ingredient sourcing, and preparation methods meet our standards.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Continuous Monitoring',
      description: 'We maintain ongoing relationships with restaurants, monitoring certificate renewals and conducting periodic reviews to ensure continued compliance.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="sitewidth">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="heading mb-6">How do we verify Halal Restaurants?</h2>
            <p className="text-lg text-text-secondary mb-8">
              We take halal verification seriously. Every restaurant on our platform goes through 
              a rigorous verification process to ensure authenticity and compliance with halal standards.
            </p>
            
            {/* Accordion */}
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenStep(openStep === step.id ? 0 : step.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    aria-expanded={openStep === step.id}
                    aria-controls={`step-${step.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-secondary text-left">
                        {step.title}
                      </h3>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openStep === step.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    id={`step-${step.id}`}
                    className={`px-6 pb-4 transition-all duration-200 ${
                      openStep === step.id ? 'block' : 'hidden'
                    }`}
                  >
                    <p className="text-text-secondary pl-14">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">100% Verified</h3>
                <p className="text-text-secondary">
                  Every restaurant is thoroughly vetted before being listed
                </p>
              </div>
              
              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-text-secondary">Certifications Verified</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-text-secondary">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSteps;