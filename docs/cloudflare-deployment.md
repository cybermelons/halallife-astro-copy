# Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account (free)
- Wrangler CLI installed: `pnpm add -D wrangler`

## Deployment Methods

### Method 1: Git Integration (Recommended)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select "Pages" from sidebar
3. Click "Create a project" → "Connect to Git"
4. Authorize GitHub and select the repository
5. Configure build settings:
   - Framework preset: None
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Environment variables: `NODE_VERSION = 18`
6. Click "Save and Deploy"

### Method 2: Direct Upload
```bash
# Build the project
pnpm build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=halallife-astro-copy
```

### Method 3: Wrangler CLI with Git
```bash
# Login to Cloudflare
npx wrangler login

# Create the project
npx wrangler pages project create halallife-astro-copy

# Deploy
npx wrangler pages deploy dist
```

## Environment Variables

### Via Dashboard
1. Go to Pages project → Settings → Environment variables
2. Add production variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - Any other API keys

### Via CLI
```bash
# Add secrets
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put JWT_SECRET
```

## Custom Domain Setup
1. Go to project → Custom domains
2. Add your domain: `halallife.com` or `app.halallife.com`
3. Update DNS records as shown:
   - CNAME: `@` → `halallife-astro-copy.pages.dev`
   - Or use Cloudflare DNS for automatic setup

## API Functions

### Local Development
```bash
# Run Pages dev server with functions
npx wrangler pages dev dist

# Or during development
npx wrangler pages dev -- pnpm dev
```

### Testing Functions
```bash
# Test restaurant API
curl http://localhost:8788/api/restaurants?location=NYC

# Test search API
curl -X POST http://localhost:8788/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"halal pizza","location":"New York"}'
```

## KV Namespace Setup (for caching)
```bash
# Create KV namespace
npx wrangler kv:namespace create CACHE
npx wrangler kv:namespace create CACHE --preview

# Update wrangler.toml with the IDs provided
```

## Monitoring & Analytics

### Built-in Analytics
- Go to Pages project → Analytics
- View requests, bandwidth, and errors

### Custom Analytics
```javascript
// In your edge functions
export async function onRequest(context) {
  // Log to Analytics Engine
  context.env.ANALYTICS.writeDataPoint({
    blobs: ['restaurant_api', 'search'],
    doubles: [Date.now()],
    indexes: ['NYC']
  });
}
```

## Deployment Environments

### Preview Deployments
- Every git branch gets a preview URL
- Format: `<branch>.<project>.pages.dev`
- Useful for testing before production

### Production Deployment
- Merges to main auto-deploy to production
- Instant rollbacks available in dashboard
- Zero downtime deployments

## Performance Tips

1. **Use Cache Headers**
   ```javascript
   return new Response(data, {
     headers: {
       'Cache-Control': 'public, max-age=3600',
       'CDN-Cache-Control': 'max-age=86400'
     }
   });
   ```

2. **Enable Auto Minify**
   - Dashboard → Speed → Optimization
   - Enable JS, CSS, HTML minification

3. **Use Cloudflare Images**
   - For user uploads and dynamic images
   - Automatic optimization and resizing

## Troubleshooting

### Build Fails
- Check Node version: Set `NODE_VERSION=18` in env vars
- Verify pnpm is used: `"packageManager": "pnpm@8.15.0"` in package.json

### Function Not Working
- Check function path: `/functions/api/[name].js`
- Verify exports: `export async function onRequestGet/Post/etc`
- Check wrangler.toml compatibility date

### Domain Not Working
- Verify DNS propagation (can take up to 48h)
- Check SSL/TLS settings: Full (strict) mode
- Ensure no conflicting page rules

## Cost Optimization

- **Free tier**: 500 builds/month, unlimited requests
- **Use KV sparingly**: 1GB free, then $0.50/GB
- **Optimize images**: Use Cloudflare Polish or Images API
- **Cache aggressively**: Reduce origin requests

## Next Steps

1. Deploy the static site first
2. Add API functions as needed
3. Set up KV for caching
4. Configure custom domain
5. Monitor analytics and optimize