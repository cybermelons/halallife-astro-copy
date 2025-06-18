# GoHalalLife Site Map & Content Plan

## Current Status
✅ = Completed
🚧 = In Progress
❌ = Not Started

## Main Pages

### 1. Homepage (/) ✅
- Hero section with search
- Featured restaurants
- Popular cuisines carousel
- How we verify section
- Blog preview
- Contact form
- Eligibility banner
- What is Halal section

### 2. About Us (/about) ❌
- Our mission
- How it started
- Team section
- Values & principles
- Community impact stats

### 3. Restaurants (/restaurants) ❌
- Search/filter interface
- Restaurant grid with pagination
- Map view toggle
- Filter by:
  - Cuisine type
  - Location/distance
  - Rating
  - Price range
  - Halal certification type

### 4. Restaurant Detail (/restaurants/[slug]) ❌
- Restaurant header with images
- Menu sections
- Reviews & ratings
- Location & hours
- Halal certification info
- Similar restaurants

### 5. Cuisines (/cuisines) ❌
- All cuisine types grid
- Popular cuisines
- Cuisine counts

### 6. Cuisine Detail (/cuisines/[type]) ❌
- Cuisine description
- Featured restaurants for this cuisine
- Popular dishes
- Related blog posts

### 7. Blog (/blog) ❌
- Blog post grid
- Categories sidebar
- Search functionality
- Featured posts

### 8. Blog Post (/blog/[slug]) ❌
- Article content
- Author info
- Related posts
- Share buttons
- Comments section

### 9. Contact (/contact) ❌
- Contact form (expanded from homepage)
- Office locations
- Support hours
- FAQ links

### 10. Submit Restaurant (/submit-restaurant) ❌
- Multi-step form
- Requirements checklist
- Upload certification
- Restaurant details

### 11. For Restaurants (/for-restaurants) ❌
- Benefits of listing
- Verification process
- Pricing (if any)
- Success stories
- Get started CTA

### 12. Login (/login) ❌
- Email/password form
- Social login options
- Forgot password link
- Sign up link

### 13. Sign Up (/signup) ❌
- Registration form
- Email verification
- Terms acceptance

### 14. User Dashboard (/dashboard) ❌
- Saved restaurants
- Recent searches
- Reviews written
- Profile settings

## Footer Pages

### Legal
- Terms & Conditions (/terms) ❌
- Privacy Policy (/privacy) ❌
- Cookie Policy (/cookies) ❌
- Disclaimer (/disclaimer) ❌

### Support
- FAQ (/faq) ❌
- How It Works (/how-it-works) ❌
- Trust & Safety (/trust-safety) ❌

### Company
- Careers (/careers) ❌
- Press (/press) ❌
- Partners (/partners) ❌

## API/Data Pages
- Search Results (/search?q=...) ❌
- Location Pages (/locations/[city]) ❌

## Priority for Implementation

### Phase 1: Core Pages (MVP)
1. About Us
2. Restaurants listing
3. Restaurant detail template
4. Blog listing
5. Blog post template

### Phase 2: User Features
1. Login/Signup
2. User dashboard
3. Submit restaurant

### Phase 3: Content Pages
1. All footer pages
2. Cuisine pages
3. Location pages

## Content Structure

Each page will have:
- `/content/pages/[pagename].md` - Page-specific content
- `/src/pages/[pagename].astro` - Astro page component
- `/src/components/[PageName]/` - Page-specific components

## Next Steps
1. Extract text content from each page
2. Create markdown files with content
3. Build Astro pages using the content
4. Implement page-specific components
5. Add routing and navigation