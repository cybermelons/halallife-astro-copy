# Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Git repository connected

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Astro framework
5. Configure build settings:
   - Framework Preset: Astro
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

### 3. Deploy
- Click "Deploy"
- Wait for build to complete (2-3 minutes)
- Your site will be live at `your-project.vercel.app`

## Environment Variables
No environment variables needed for this static site.

## Custom Domain (Optional)
1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Performance Optimizations
Vercel automatically provides:
- CDN distribution
- Brotli compression
- HTTP/2 support
- Automatic HTTPS

## Monitoring
- Check Vercel Analytics for performance metrics
- Monitor build times in deployment logs
- Set up alerts for failed deployments

## Updating the Site
1. Make changes locally
2. Test with `pnpm build` and `pnpm preview`
3. Commit and push to trigger automatic deployment
4. Vercel will build and deploy automatically

## Rollback
If needed, you can instantly rollback to any previous deployment:
1. Go to Vercel dashboard
2. Click on your project
3. Navigate to "Deployments"
4. Click "..." menu on any previous deployment
5. Select "Promote to Production"