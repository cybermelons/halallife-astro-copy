import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { 
      label: 'Restaurants', 
      href: '#',
      dropdown: [
        { label: 'All Restaurants', href: '#' },
        { label: 'Near Me', href: '#' },
        { label: 'Recently Added', href: '#' },
        { label: 'Popular', href: '#' }
      ]
    },
    { 
      label: 'Cuisines', 
      href: '#',
      dropdown: [
        { label: 'Mediterranean', href: '#' },
        { label: 'Indian', href: '#' },
        { label: 'Middle Eastern', href: '#' },
        { label: 'Pakistani', href: '#' },
        { label: 'Turkish', href: '#' },
        { label: 'All Cuisines', href: '#' }
      ]
    },
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="sitewidth">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src="/assets/logos/gohalallifelogo.png" 
              alt="GoHalalLife" 
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <button
                    className="text-secondary hover:text-primary transition-colors duration-200 flex items-center gap-1 py-2"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-secondary hover:bg-cuisinecard hover:text-primary transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Restaurant
            </Button>
            
            <Button className="hidden md:flex">
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navItems.map((item) => (
              <div key={item.label} className="py-2">
                <a
                  href={item.href}
                  className="block text-secondary hover:text-primary transition-colors duration-200 py-2"
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-sm text-secondary hover:text-primary transition-colors py-1"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2 border-t mt-4">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Restaurant
              </Button>
              <Button className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;