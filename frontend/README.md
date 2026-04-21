# Modern Admin Dashboard - Blackcoffer Assignment

A comprehensive data visualization dashboard built with the MERN stack, featuring D3.js animations and a modern admin panel interface.

## 🚀 Features

### Authentication System
- **Login Page**: Modern design with purple gradient theme
- **Credentials**: Pre-filled for easy access
  - Email: `admin`
  - Password: `admin123`
- **Protected Routes**: Dashboard accessible only after authentication
- **Session Management**: localStorage-based authentication

### Modern Admin Panel
- **Responsive Sidebar**: Collapsible navigation menu with active states
- **Top Navbar**: Search bar, notifications (with badges), user profile
- **Dashboard Layout**: Professional card-based design
- **Stats Cards**: 4 KPI cards with gradient icons and trend indicators
- **Chart Cards**: All visualizations wrapped in modern card containers with headers

### Data Visualization (D3.js)
1. **Intensity Chart**: Bar chart showing top 15 topics
2. **Likelihood Chart**: Bubble chart with sector-based coloring
3. **Relevance Chart**: Bar chart by region with Plasma color scale
4. **Year Trend**: Multi-line chart tracking 3 metrics over time
5. **Region-Country Heatmap**: Interactive grid visualization

### Dynamic Filters
9 real-time filters:
- End Year
- Topic
- Sector
- Region
- PESTLE
- Source
- SWOT
- Country
- City

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 + TypeScript + Vite 7.2.4
- **Routing**: React Router DOM 6.21.1
- **Visualization**: D3.js 7.8.5
- **Styling**: Plain CSS with modern gradients and animations
- **Backend**: Node.js + Express 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3

## 📦 Installation

### Backend Setup
```bash
cd server
npm install
npm run seed    # Seed database with sample data
npm run dev     # Start server on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Start dev server on port 5173
```

## 🔐 Login Credentials

Access the dashboard using these credentials (pre-filled):
- **Email**: admin
- **Password**: admin123

## 🎨 Design Inspiration

The modern admin panel design is inspired by professional templates like Vuexy, featuring:
- Clean white card-based layouts
- Gradient accent colors (#667eea to #764ba2)
- Smooth transitions and hover effects
- Responsive grid system
- Professional typography and spacing


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
