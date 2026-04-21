#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Blackcoffer Dashboard - Setup Verification"
echo "=============================================="
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js v18+"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check MongoDB
echo -n "Checking MongoDB... "
if command -v mongod &> /dev/null
then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} MongoDB not found (you can use MongoDB Atlas)"
fi

echo ""
echo "📦 Checking project structure..."

# Check backend folder
if [ -d "server" ]; then
    echo -e "${GREEN}✓${NC} server/ folder exists"
else
    echo -e "${RED}✗${NC} server/ folder not found"
    exit 1
fi

# Check frontend folder
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓${NC} frontend/ folder exists"
else
    echo -e "${RED}✗${NC} frontend/ folder not found"
    exit 1
fi

# Check jsondata.json
if [ -f "jsondata.json" ]; then
    echo -e "${GREEN}✓${NC} jsondata.json exists"
else
    echo -e "${RED}✗${NC} jsondata.json not found"
    exit 1
fi

echo ""
echo "📋 Checking backend files..."

# Check backend files
BACKEND_FILES=(
    "server/package.json"
    "server/.env"
    "server/server.js"
    "server/app.js"
    "server/config/db.js"
    "server/models/Insight.js"
    "server/controllers/insightController.js"
    "server/routes/insightRoutes.js"
    "server/utils/seedData.js"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

echo ""
echo "📋 Checking frontend files..."

# Check frontend files
FRONTEND_FILES=(
    "frontend/package.json"
    "frontend/src/App.tsx"
    "frontend/src/services/api.js"
    "frontend/src/pages/Dashboard.jsx"
    "frontend/src/components/Filters.jsx"
    "frontend/src/components/Charts/IntensityChart.jsx"
    "frontend/src/components/Charts/LikelihoodChart.jsx"
    "frontend/src/components/Charts/RelevanceChart.jsx"
    "frontend/src/components/Charts/YearTrend.jsx"
    "frontend/src/components/Charts/RegionCountryMap.jsx"
    "frontend/src/styles/dashboard.css"
    "frontend/src/styles/filters.css"
)

for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

echo ""
echo "🔧 Checking dependencies..."

# Check backend dependencies
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Backend dependencies not installed. Run: cd server && npm install"
fi

# Check frontend dependencies
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed. Run: cd frontend && npm install"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}✓ Verification Complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. cd server && npm install"
echo "2. npm run seed (one-time)"
echo "3. npm run dev (in server)"
echo "4. cd ../frontend && npm install"
echo "5. npm run dev (in frontend)"
echo "6. Visit http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "- README.md - Full documentation"
echo "- QUICK_START.md - Quick setup guide"
echo "- DEPLOYMENT.md - Deployment instructions"
echo "- PROJECT_SUMMARY.md - Project overview"
echo ""
