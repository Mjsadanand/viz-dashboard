# 🚀 Deployment Guide

## Overview
This guide covers deploying the Data Visualization Dashboard to various platforms.

---

## 🔧 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] MongoDB connection string ready
- [ ] Environment variables documented
- [ ] Build process verified
- [ ] CORS configured correctly

---

## 🌐 Backend Deployment Options

### Option 1: Render.com (Free Tier Available)

1. **Create account** at [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy** and copy your service URL

### Option 2: Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create app**:
   ```bash
   cd server
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 3: Railway.app

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add MongoDB database from Railway marketplace
4. Set environment variables
5. Deploy automatically on push

---

## 📦 Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

3. **Update API URL** in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

4. **Deploy**:
   ```bash
   vercel
   ```

### Option 2: Netlify

1. **Build the app**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or use Netlify Dashboard**:
   - Drag and drop the `dist` folder

### Option 3: GitHub Pages

1. **Update `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   gh-pages -d dist
   ```

---

## 🗄️ Database Deployment (MongoDB Atlas)

### Setup MongoDB Atlas (Free Tier)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**:
   - Choose FREE tier (M0)
   - Select region closest to your backend

3. **Create Database User**:
   - Database Access → Add New Database User
   - Save username and password

4. **Whitelist IP**:
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere)

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

6. **Seed Database** (one-time):
   ```bash
   # Update .env with Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blackcoffer
   
   # Run seed script
   npm run seed
   ```

---

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Frontend (Update in code)
```javascript
// src/services/api.js
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

Create `.env` in frontend:
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🛡️ Security Checklist

- [ ] Use environment variables for sensitive data
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS for both frontend and backend
- [ ] Implement rate limiting on API
- [ ] Hide MongoDB credentials
- [ ] Add API authentication (optional)

---

## 🔄 CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Add your deployment commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to Vercel/Netlify
```

---

## 📊 Post-Deployment Testing

### Test Checklist
- [ ] Visit frontend URL - loads correctly
- [ ] Check KPI cards - showing data
- [ ] Test all filters - updates charts
- [ ] Verify all 5 charts render
- [ ] Check tooltips work
- [ ] Test on mobile device
- [ ] Check browser console - no errors
- [ ] Test API endpoints directly

### API Health Check
```bash
# Test backend is running
curl https://your-backend-url.com/

# Test data endpoint
curl https://your-backend-url.com/api/insights?limit=5
```

---

## 🐛 Troubleshooting Deployment Issues

### Issue: CORS Error
**Solution**: Update backend CORS settings:
```javascript
// app.js
app.use(cors({
  origin: ['https://your-frontend-url.com'],
  credentials: true
}));
```

### Issue: MongoDB Connection Failed
**Solutions**:
1. Check IP whitelist in Atlas
2. Verify connection string format
3. Ensure network allows outbound connections

### Issue: Build Fails
**Solutions**:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check Node.js version matches locally
3. Review build logs for specific errors

### Issue: Charts Not Rendering
**Solutions**:
1. Check API URL is correct
2. Verify CORS is configured
3. Check browser console for errors
4. Ensure D3.js is included in build

---

## 📈 Performance Optimization

### Backend
- Enable gzip compression
- Add caching headers
- Optimize database queries
- Add pagination for large datasets

### Frontend
- Code splitting
- Lazy load charts
- Optimize bundle size
- Enable browser caching

---

## 🎯 Recommended Stack

**Best Free Combination**:
- **Backend**: Render.com
- **Frontend**: Vercel
- **Database**: MongoDB Atlas (M0 Free Tier)

**Total Cost**: $0/month (Free tier limits apply)

---

## 📝 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Settings → Custom Domain
2. Add domain and configure DNS

---

## 🔔 Monitoring & Logs

### Backend Monitoring
- Use Render/Heroku dashboard for logs
- Set up error tracking (Sentry)
- Monitor API response times

### Frontend Monitoring
- Vercel Analytics (built-in)
- Google Analytics
- Error tracking (Sentry)

---

## ✅ Deployment Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with data
- [ ] All API endpoints working
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Charts rendering correctly
- [ ] Filters working
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL/HTTPS enabled

---

**🎉 Congratulations! Your dashboard is now live!**

For issues, refer to the [README.md](README.md) or [QUICK_START.md](QUICK_START.md).
