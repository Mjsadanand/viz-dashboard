# Component Architecture

## Component Tree

```
App.tsx (Router)
│
├─ Route "/" 
│  └─ Login.jsx
│     └─ login.css
│
└─ Route "/dashboard" (Protected)
   └─ Dashboard.jsx
      ├─ dashboard.css
      │
      ├─ Sidebar.jsx
      │  └─ sidebar.css
      │
      ├─ Navbar.jsx
      │  └─ navbar.css
      │
      ├─ Filters.jsx
      │  └─ filters.css
      │
      └─ Charts/
         ├─ IntensityChart.jsx
         │  └─ intensityChart.css
         ├─ LikelihoodChart.jsx
         │  └─ likelihoodChart.css
         ├─ RelevanceChart.jsx
         │  └─ relevanceChart.css
         ├─ YearTrend.jsx
         │  └─ yearTrend.css
         └─ RegionCountryMap.jsx
            └─ regionCountryMap.css
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                     App.tsx                         │
│              (React Router Setup)                   │
└────────┬────────────────────────────────┬───────────┘
         │                                │
         ├─ Public Route                  ├─ Protected Route
         │                                │
    ┌────▼────┐                      ┌────▼─────────────────────┐
    │ Login   │                      │    Dashboard.jsx         │
    │         │                      │                          │
    │ State:  │                      │ State:                   │
    │  email  │                      │  insights (array)        │
    │  pwd    │                      │  loading (boolean)       │
    │  error  │ ──localStorage──>    │  error (string)          │
    │         │  isAuthenticated     │  filters (object)        │
    │ Action: │                      │  activePage (string)     │
    │  login()│                      │                          │
    └─────────┘                      └─┬─────┬─────┬─────┬──────┘
                                       │     │     │     │
                       ┌───────────────┘     │     │     └────────┐
                       │                     │     │              │
                  ┌────▼─────┐       ┌──────▼──┐  │      ┌───────▼────┐
                  │ Sidebar  │       │ Navbar  │  │      │  Filters   │
                  │          │       │         │  │      │            │
                  │ Props:   │       │ (Static)│  │      │ Props:     │
                  │ active   │       └─────────┘  │      │  filters   │
                  │ onLogout │                     │      │  onChange  │
                  └──────────┘                     │      │  onReset   │
                                                   │      └────────────┘
                                           ┌───────▼────────┐
                                           │ 5 Chart        │
                                           │ Components     │
                                           │                │
                                           │ Each receives: │
                                           │  - data prop   │
                                           │  - filters     │
                                           │                │
                                           │ Renders:       │
                                           │  - D3.js SVG   │
                                           │  - Tooltips    │
                                           │  - Animations  │
                                           └────────────────┘
```

## State Management Flow

### 1. Authentication Flow
```
┌──────────┐        ┌──────────────┐        ┌───────────┐
│  Login   │────────> localStorage  │────────> Dashboard │
│          │ store   │              │ verify │           │
│  admin   │ token   │ isAuth=true  │ token  │  render   │
│  admin123│         │              │        │           │
└──────────┘         └──────────────┘        └───────────┘
     │                                              │
     │                                              │
     └──────────────────────────────────────────────┘
                    Navigate('/dashboard')
```

### 2. Data Fetching Flow
```
Dashboard.jsx
     │
     ├─ useEffect() on mount
     │  ├─ setLoading(true)
     │  ├─ fetch('/api/insights')
     │  ├─ fetch('/api/insights/stats')
     │  ├─ setInsights(data)
     │  └─ setLoading(false)
     │
     ├─ useEffect() on filter change
     │  ├─ Build query params
     │  ├─ fetch with filters
     │  └─ Update insights
     │
     └─ Pass data to child components
```

### 3. Filter Change Flow
```
User selects filter
     │
     ▼
Filters.jsx
     │
     ├─ handleChange(field, value)
     │  └─ onFilterChange({ ...filters, [field]: value })
     │
     ▼
Dashboard.jsx
     │
     ├─ setFilters(newFilters)
     │
     ├─ useEffect triggered
     │  └─ fetchData(newFilters)
     │
     ▼
Charts receive new data
     │
     └─ D3.js re-renders with animation
```

## Props Interface

### Login Component
```typescript
interface LoginProps {
  // No props - self-contained
}

interface LoginState {
  email: string;           // 'admin'
  password: string;        // 'admin123'
  rememberMe: boolean;     // false
  error: string;           // ''
}
```

### Sidebar Component
```typescript
interface SidebarProps {
  activePage: string;      // 'dashboard' | 'analytics' | 'charts' | 'data'
  isCollapsed: boolean;    // false
  onNavigate: (page: string) => void;
  onLogout: () => void;
}
```

### Navbar Component
```typescript
interface NavbarProps {
  // Static component - no props
}
```

### Filters Component
```typescript
interface FiltersProps {
  filters: FilterState;
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

interface FilterState {
  end_year: string;
  topic: string;
  sector: string;
  region: string;
  pestle: string;
  source: string;
  swot: string;
  country: string;
  city: string;
}
```

### Chart Components
```typescript
interface ChartProps {
  data: Insight[];        // Array of data objects
  filters: FilterState;   // Current filter state
}

interface Insight {
  _id: string;
  end_year: number;
  intensity: number;
  likelihood: number;
  relevance: number;
  start_year: number;
  country: string;
  topic: string;
  region: string;
  sector: string;
  pestle: string;
  source: string;
  swot: string;
  // ... other fields
}
```

## API Integration

### Endpoints Used
```javascript
// Dashboard.jsx calls these APIs

1. GET /api/insights
   Query Params: ?end_year=2025&topic=energy&...
   Response: { data: Insight[] }

2. GET /api/insights/stats
   Response: { 
     totalInsights: number,
     uniqueSectors: number,
     uniqueTopics: number,
     uniqueRegions: number
   }

3. GET /api/insights/filters
   Response: {
     years: string[],
     topics: string[],
     sectors: string[],
     regions: string[],
     // ... other filter options
   }
```

## Styling Architecture

### CSS Organization
```
Global Styles
├─ App.css (reset, scrollbar, fonts)
└─ index.css (base styles)

Layout Styles
├─ dashboard.css (admin layout, cards, grid)
├─ sidebar.css (navigation menu)
└─ navbar.css (top bar)

Component Styles
├─ login.css (auth page)
├─ filters.css (filter panel)
└─ charts/
   ├─ intensityChart.css
   ├─ likelihoodChart.css
   ├─ relevanceChart.css
   ├─ yearTrend.css
   └─ regionCountryMap.css
```

### CSS Variables (Potential)
```css
:root {
  /* Colors */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-color: #f7f8fc;
  --card-bg: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #666;
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 30px;
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.08);
}
```

## Lifecycle Hooks Usage

### Dashboard.jsx
```javascript
// 1. Fetch initial data on mount
useEffect(() => {
  fetchInsights();
  fetchStats();
  fetchFilterOptions();
}, []);

// 2. Check authentication on mount
useEffect(() => {
  if (!localStorage.getItem('isAuthenticated')) {
    navigate('/');
  }
}, []);

// 3. Re-fetch data when filters change
useEffect(() => {
  if (Object.values(filters).some(v => v !== '')) {
    fetchInsights();
  }
}, [filters]);
```

### Chart Components
```javascript
// 1. Initial render with D3
useEffect(() => {
  renderChart();
}, []);

// 2. Update on data change
useEffect(() => {
  updateChart();
}, [data]);

// 3. Cleanup on unmount
useEffect(() => {
  return () => {
    d3.select(svgRef.current).selectAll('*').remove();
  };
}, []);
```

## Event Handlers

### Login.jsx
- `handleSubmit(e)` - Form submission
- `handleInputChange(field, value)` - Update state

### Dashboard.jsx
- `handleFilterChange(filters)` - Update filters
- `handleResetFilters()` - Clear all filters
- `handleLogout()` - Clear auth and navigate

### Sidebar.jsx
- `handleNavigate(page)` - Change active page
- `handleCollapse()` - Toggle sidebar

## Browser APIs Used

1. **localStorage**
   - `setItem('isAuthenticated', 'true')`
   - `getItem('isAuthenticated')`
   - `removeItem('isAuthenticated')`

2. **fetch/axios**
   - GET requests to backend APIs
   - Query parameter building

3. **History API** (via React Router)
   - `navigate('/dashboard')`
   - `navigate('/')`
   - `<Navigate to="/" />`

4. **DOM API** (via D3.js)
   - SVG manipulation
   - Event listeners
   - Transitions and animations

---

This architecture provides a scalable, maintainable foundation for the modern admin dashboard! 🏗️
