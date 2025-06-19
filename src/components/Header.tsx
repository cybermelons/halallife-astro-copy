import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const navItems = [
    { 
      label: 'Restaurants', 
      href: '#',
      dropdown: [
        { label: 'All Restaurants', href: '/restaurants' },
        { label: 'Near Me', href: '/restaurants/near-me' },
        { label: 'Recently Added', href: '/restaurants/recent' },
        { label: 'Popular', href: '/restaurants/popular' }
      ]
    },
    { 
      label: 'Cuisines', 
      href: '#',
      dropdown: [
        { label: 'Mediterranean', href: '/restaurants?cuisine=mediterranean' },
        { label: 'Indian', href: '/restaurants?cuisine=indian' },
        { label: 'Middle Eastern', href: '/restaurants?cuisine=middle-eastern' },
        { label: 'Pakistani', href: '/restaurants?cuisine=pakistani' },
        { label: 'Turkish', href: '/restaurants?cuisine=turkish' },
        { label: 'All Cuisines', href: '/restaurants/cuisines' }
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact', href: '/about#contact-us' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <nav className="sitewidth" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src="/assets/logos/gohalallifelogo.png" 
              alt="GoHalalLife - Find Halal Restaurants Near You" 
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8"
               onMouseLeave={handleMouseLeave}
          >
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <button
                    className="text-secondary hover:text-primary transition-colors duration-200 flex items-center gap-1 py-2 px-1"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      } else if (e.key === 'Escape') {
                        setActiveDropdown(null);
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === item.label}
                    aria-controls={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`text-secondary hover:text-primary transition-colors duration-200 ${currentPath === item.href ? 'text-primary font-semibold' : ''}`}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <ul 
                    id={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
                    role="menu"
                    aria-label={`${item.label} submenu`}
                    className="absolute top-full left-0 pt-2 w-48 z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-lg shadow-lg py-2">
                    {item.dropdown.map((subItem) => (
                      <li role="none" key={subItem.label}>
                        <a
                          href={subItem.href}
                          role="menuitem"
                          tabIndex={activeDropdown === item.label ? 0 : -1}
                          className="block px-4 py-2 text-sm text-secondary hover:bg-cuisinecard hover:text-primary transition-colors"
                          aria-current={currentPath === subItem.href ? 'page' : undefined}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                    </div>
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Restaurant
            </Button>
            
            <Button className="hidden md:flex">
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      </nav>
    </header>
  );
};

export default Header;