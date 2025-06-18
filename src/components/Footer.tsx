import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' }
    ],
    resources: [
      { label: 'Blog', href: '/blogs' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Submit a Restaurant', href: '/submit-restaurant' },
      { label: 'Report an Issue', href: '/report' }
    ],
    legal: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' }
    ],
    connect: [
      { label: 'Facebook', href: 'https://facebook.com/gohalallife', external: true },
      { label: 'Twitter', href: 'https://twitter.com/gohalallife', external: true },
      { label: 'Instagram', href: 'https://instagram.com/gohalallife', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/gohalallife', external: true }
    ]
  };

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="sitewidth py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <img 
              src="/assets/logos/gohalallifelogo.png" 
              alt="GoHalalLife" 
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted platform for finding authentic halal restaurants across the United States. 
              Every restaurant is verified for your peace of mind.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
            <h4 className="font-semibold mb-4">Resources</h4>
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
            <h4 className="font-semibold mb-4">Legal</h4>
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
              <h4 className="font-semibold mb-2">Get the App</h4>
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
              <h4 className="font-semibold mb-4">Connect with us</h4>
              <div className="flex gap-4 md:justify-end">
                {footerLinks.connect.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    aria-label={link.label}
                  >
                    <span className="text-sm">{link.label[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20">
        <div className="sitewidth py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} GoHalalLife. All rights reserved.</p>
            <p>Made with ❤️ for the Muslim community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;