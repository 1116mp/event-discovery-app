# Vercel Deployment Guide

This project is configured to deploy on Vercel with:
- Frontend: Static site built with Vite
- Backend: Serverless functions in the `/api` directory

## Deployment Steps

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

2. **Build Settings:**
   - **Root Directory:** Leave empty (or set to repository root)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install`

3. **Environment Variables (Optional):**
   - `VITE_API_URL`: If you want to use a different API URL in production

## Project Structure for Vercel

```
/
├── api/                    # Serverless functions
│   └── events/
│       ├── index.js       # GET/POST /api/events
│       ├── [id].js        # GET /api/events/:id
│       └── [id]/
│           └── rsvp.js    # POST /api/events/:id/rsvp
├── frontend/               # React app
│   ├── dist/              # Build output (created during build)
│   └── ...
└── vercel.json            # Vercel configuration
```

## API Routes

The following API endpoints are available:
- `GET /api/events` - List all events with optional filters
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `POST /api/events/:id/rsvp` - RSVP to an event

## Troubleshooting

If you encounter build errors:

1. **Check Node.js version:** Vercel uses Node 18.x by default
2. **Check build logs:** View detailed errors in Vercel dashboard
3. **Local build test:** Run `cd frontend && npm install && npm run build`
4. **API functions:** Ensure all dependencies are in the root `package.json` or `api/package.json`

## Notes

- The frontend automatically uses `/api` as the base URL in production
- Serverless functions are stateless, so events stored in memory will reset on each deployment
- For persistent storage, consider using a database service (MongoDB, PostgreSQL, etc.)

