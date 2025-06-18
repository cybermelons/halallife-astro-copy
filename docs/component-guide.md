# Component Usage Guide

## Overview
This site is built with Astro, using React components for interactive elements and Tailwind CSS for styling.

## Component Structure

### Layout Components
- **Layout.astro**: Main layout wrapper with header/footer
  - Props: `title` (required), `description` (optional)
  - Usage: Wraps all pages with consistent structure

### Page Sections

#### Hero.tsx
Interactive hero section with location search.
```astro
<Hero client:load />
```
- Uses `client:load` for immediate interactivity
- Contains search form with location input

#### Header.tsx
Navigation header with dropdown menus.
```astro
<Header client:load />
```
- Mobile-responsive with hamburger menu
- Dropdown navigation for desktop

#### RestaurantGrid.tsx
Grid display of restaurant cards.
```astro
<RestaurantGrid client:visible />
```
- Responsive grid (1/2/3 columns)
- Mock data included for demo

#### CuisineCarousel.tsx
Auto-scrolling cuisine category carousel.
```astro
<CuisineCarousel client:visible />
```
- Dynamic items per view based on screen size
- Auto-play with pause on hover
- Navigation controls and dots

#### BlogCarousel.tsx
Blog post carousel with navigation.
```astro
<BlogCarousel client:visible />
```
- Responsive (1/2/3 items)
- Manual navigation arrows
- Card-based layout

#### VerificationSteps.tsx
Accordion-style verification process display.
```astro
<VerificationSteps client:visible />
```
- Interactive accordion
- Icons for each step
- Trust badges

#### ContactForm.tsx
Contact form with validation.
```astro
<ContactForm client:visible />
```
- Form validation
- Responsive 2-column layout
- Contact information sidebar

#### Static Components
- **EligibilityBanner.astro**: CTA banner (no interactivity)
- **WhatIsHalal.astro**: Info section (no interactivity)
- **Footer.tsx**: Site footer with links

## Styling System

### Tailwind Configuration
- Custom colors mapped to CSS variables
- Manrope font family
- Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

### Global Classes
- `.sitewidth`: Container with responsive padding
- `.mainheading`: Large display heading
- `.heading`: Section headings
- `.subheading`: Smaller headings
- `.hovereffect`: Hover scale animation

## Performance Considerations

### Client Directives
- `client:load`: For above-fold interactive components
- `client:visible`: For below-fold components
- No directive: For static HTML output

### Image Optimization
- All images use `loading="lazy"`
- Proper alt text for accessibility
- Recommendation: Convert to WebP before production

## Development Workflow

### Commands
```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

### Adding New Components
1. Create component in `src/components/`
2. Import in page file
3. Choose appropriate client directive
4. Follow existing patterns for consistency

### Deployment
- Configured for Vercel deployment
- Static site generation
- No server-side rendering needed

## Accessibility
- ARIA labels on interactive elements
- Proper heading hierarchy
- Keyboard navigation support
- Form labels and validation