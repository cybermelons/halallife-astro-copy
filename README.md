# HalalLife Astro Copy

A pixel-perfect copy of gohalallife.com built with Astro, Tailwind CSS, and shadcn/ui.

## 🎯 Project Goals

- Create an exact visual copy of the existing HalalLife website
- Use modern technologies (Astro, React, Tailwind)
- Prepare a clean foundation for adding real functionality
- Maintain accessibility standards (WCAG 2.1 AA)

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **UI Components**: React + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: pnpm

## 📁 Project Structure

```
/
├── public/           # Static assets (images, fonts)
├── src/
│   ├── components/   # React components
│   ├── layouts/      # Astro layouts
│   ├── pages/        # Astro pages
│   └── styles/       # Global styles
├── scripts/          # Build and utility scripts
└── download-assets.js # Asset extraction script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/cybermelons/halallife-astro-copy.git
cd halallife-astro-copy

# Install dependencies
pnpm install

# Extract assets from original site (requires puppeteer)
# Use pnpx to run without installing puppeteer as dependency
pnpx puppeteer@latest node scripts/download-assets.js

# Start development server
pnpm dev
```

## 📝 Development Plan

### Phase 1: Asset Extraction ✅
- [x] Create Puppeteer script to download all assets
- [ ] Organize assets in proper folders
- [ ] Optimize images for web

### Phase 2: Project Setup
- [ ] Initialize Astro with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui
- [ ] Add Manrope font

### Phase 3: Component Development
- [ ] Header with navigation
- [ ] Hero section with search
- [ ] Restaurant grid
- [ ] Info sections
- [ ] Footer

### Phase 4: Testing & Deployment
- [ ] Visual comparison testing
- [ ] Responsive design verification
- [ ] Deploy to Vercel

## 🎨 Design System

### Colors
- Primary: `#10b981` (Emerald 500)
- Secondary: `#171717` (Neutral 900)
- Background: `#ffffff`

### Typography
- Font: Manrope
- Weights: 400, 500, 600, 700, 800

## 📄 License

This is a demonstration project for portfolio purposes.

## 🤝 Contributing

This is a private project, but feedback is welcome!

---

Built with ❤️ for the HalalLife community