import React, { useState } from 'react';
import FormError from './FormError';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('newsletter-email') as HTMLInputElement).value;
    
    // Reset error state
    setEmailError(false);
    setEmailErrorMessage('');
    
    // Basic validation
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage('Email address is required');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Submit form (placeholder)
    console.log('Newsletter subscription:', email);
    form.reset();
  };

  const footerLinks = {
    about: [
      { label: 'GoHalalLife', href: '/about#go-halal-life' },
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Mission Statement', href: '/about#mission-statement' },
      { label: 'Halal Verification Process', href: '/about#about-verify' },
      { label: 'Contact Us', href: '/about#contact-us' }
    ],
    resources: [
      { label: 'FAQ', href: '/' },
      { label: 'Blog', href: '/blogs' },
      { label: 'Submit A Restaurant', href: '/' },
      { label: 'Report an Issue', href: '/' }
    ],
    legal: [
      { label: 'Terms & Condition', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Cookie Policy', href: '/' }
    ],
    connect: [
      { label: 'Facebook', href: 'https://facebook.com/gohalallife', external: true },
      { label: 'Twitter', href: 'https://twitter.com/gohalallife', external: true },
      { label: 'Instagram', href: 'https://instagram.com/gohalallife', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/gohalallife', external: true }
    ]
  };

  return (
    <footer className="bg-secondary text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="sitewidth py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <img 
              src="/assets/logos/gohalallifelogo.png" 
              alt="GoHalalLife - Find Halal Restaurants Near You" 
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted platform for finding authentic halal restaurants across the United States. 
              Every restaurant is verified for your peace of mind.
            </p>
            
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-3 text-base">Subscribe to our newsletter</h3>
              <form className="flex flex-col gap-2" aria-label="Newsletter subscription" onSubmit={handleNewsletterSubmit}>
                <div className="flex gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <input
                    id="newsletter-email"
                    name="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    aria-required="true"
                    aria-invalid={emailError}
                    aria-describedby={emailError ? "newsletter-error" : undefined}
                    required
                    className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </div>
                <FormError id="newsletter-error" message={emailErrorMessage} visible={emailError} />
              </form>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-base">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold mb-2 text-base">Get the App</h3>
              <p className="text-gray-400 mb-4">
                Download our mobile app for the best halal dining experience on the go.
              </p>
              <div className="flex gap-3">
                <a href="#" className="inline-block">
                  <img 
                    src="/assets/images/app-store.png" 
                    alt="Download on App Store"
                    className="h-10"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img 
                    src="/assets/images/google-play.png" 
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="md:text-right">
              <h3 className="font-semibold mb-4 text-base">Connect with us</h3>
              <div className="flex gap-4 md:justify-end">
                {footerLinks.connect.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors relative"
                    aria-label={`Visit our ${link.label} page (opens in new window)`}
                  >
                    <span className="text-sm font-bold" aria-hidden="true">
                      {link.label[0]}
                      <svg className="w-3 h-3 absolute top-1 right-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20">
        <div className="sitewidth py-6">
          <div className="text-center text-sm text-gray-400">
            <p>GoHalalLife © All Rights Reserved {currentYear}</p>
            <p className="mt-1">Go Halal Life is the product of Logiveo LLC.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;