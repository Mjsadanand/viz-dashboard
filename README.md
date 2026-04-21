# Data Visualization Dashboard - MERN + D3.js

A comprehensive data visualization dashboard built with the MERN stack featuring interactive D3.js charts and advanced filtering capabilities.

## 🚀 Tech Stack

- **Frontend**: React (Vite), D3.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Visualization**: D3.js with animations

## 📁 Project Structure

```
root/
├── server/                 # Backend
│   ├── config/
│   │   └── db.js          # MongoDB configuration
│   ├── models/
│   │   └── Insight.js     # Data model
│   ├── routes/
│   │   └── insightRoutes.js
│   ├── controllers/
│   │   └── insightController.js
│   ├── utils/
│   │   └── seedData.js    # Database seeding script
│   ├── app.js
│   └── server.js
│
├── frontend/               # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts/
│   │   │   │   ├── IntensityChart.jsx
│   │   │   │   ├── LikelihoodChart.jsx
│   │   │   │   ├── RelevanceChart.jsx
│   │   │   │   ├── YearTrend.jsx
│   │   │   │   └── RegionCountryMap.jsx
│   │   │   └── Filters.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── styles/
│   │       ├── dashboard.css
│   │       └── filters.css
│   └── package.json
│
└── jsondata.json           # Source data
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string ready)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - The `.env` file is already created with default values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/blackcoffer
     NODE_ENV=development
     ```
   - Update `MONGODB_URI` if you have a different MongoDB connection

4. **Seed the database** (one-time setup):
   ```bash
   npm run seed
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📊 Features

### Visualizations (All D3.js with Animations)

1. **Intensity Chart** - Bar chart showing average intensity by topic
2. **Likelihood vs Relevance** - Bubble chart with intensity as bubble size
3. **Relevance by Region** - Colorful bar chart grouped by region
4. **Year Trends** - Multi-line chart showing trends over time
5. **Region-Country Heatmap** - Interactive heatmap visualization

### Filters

Dynamic filtering on:
- End Year
- Topic
- Sector
- Region
- PESTLE
- Source
- SWOT
- Country
- City

### Key Features

- 📈 Real-time data updates
- 🎨 Smooth D3.js animations
- 🔍 Interactive tooltips
- 📱 Responsive design
- 🎯 KPI summary cards
- ⚡ Fast API responses

## 🔌 API Endpoints

### GET `/api/insights`
Fetch all insights with optional filters

**Query Parameters**:
- `end_year` - Filter by end year
- `topic` - Filter by topic
- `sector` - Filter by sector
- `region` - Filter by region
- `pestle` - Filter by PESTLE category
- `source` - Filter by source
- `swot` - Filter by SWOT
- `country` - Filter by country
- `city` - Filter by city

**Example**:
```
GET /api/insights?topic=energy&region=Asia
```

### GET `/api/filters`
Get all available filter options (unique values)

### GET `/api/statistics`
Get aggregated statistics (averages, totals)

## 🎨 Design Highlights

- **Modern gradient backgrounds**
- **Smooth hover effects**
- **Card-based layout**
- **Color-coded visualizations**
- **Professional typography**

## 🚀 Deployment Notes

### Backend Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Run the seed script once: `npm run seed`
4. Start with: `npm start`

### Frontend Deployment

1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error**:
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network connectivity

**Seed Script Fails**:
- Ensure `jsondata.json` is in the root directory
- Check MongoDB connection
- Verify file permissions

### Frontend Issues

**API Connection Error**:
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify API_BASE_URL in `services/api.js`

**Charts Not Rendering**:
- Check browser console for errors
- Ensure D3.js is installed: `npm list d3`
- Verify data is being fetched from API

## 📝 Development Notes

- All charts use D3.js v7
- React components use hooks (functional components)
- Backend follows MVC architecture
- API uses RESTful conventions
- Data validation on both frontend and backend

## 🎯 Future Enhancements

- [ ] Add user authentication
- [ ] Export charts as images
- [ ] Add more chart types
- [ ] Implement data caching
- [ ] Add real-time updates with WebSockets
- [ ] Create mobile app version

## 📄 License

MIT License - Feel free to use for your projects

## 👨‍💻 Author

Built as part of Blackcoffer assignment

---

**Need Help?** Check the troubleshooting section or review the API documentation above.
