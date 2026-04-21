@echo off
echo.
echo Blackcoffer Dashboard - Setup Verification
echo ===========================================
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    node -v
    echo [OK] Node.js found
) else (
    echo [ERROR] Node.js not found. Please install Node.js v18+
    exit /b 1
)
echo.

REM Check npm
echo Checking npm...
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    npm -v
    echo [OK] npm found
) else (
    echo [ERROR] npm not found
    exit /b 1
)
echo.

REM Check MongoDB (optional)
echo Checking MongoDB...
where mongod >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB found
) else (
    echo [WARNING] MongoDB not found locally (you can use MongoDB Atlas)
)
echo.

REM Check project structure
echo Checking project structure...
if exist "server\" (
    echo [OK] server\ folder exists
) else (
    echo [ERROR] server\ folder not found
    exit /b 1
)

if exist "frontend\" (
    echo [OK] frontend\ folder exists
) else (
    echo [ERROR] frontend\ folder not found
    exit /b 1
)

if exist "jsondata.json" (
    echo [OK] jsondata.json exists
) else (
    echo [ERROR] jsondata.json not found
    exit /b 1
)
echo.

REM Check backend files
echo Checking backend files...
if exist "server\package.json" (echo [OK] server\package.json) else (echo [ERROR] server\package.json missing)
if exist "server\.env" (echo [OK] server\.env) else (echo [ERROR] server\.env missing)
if exist "server\server.js" (echo [OK] server\server.js) else (echo [ERROR] server\server.js missing)
if exist "server\app.js" (echo [OK] server\app.js) else (echo [ERROR] server\app.js missing)
if exist "server\config\db.js" (echo [OK] server\config\db.js) else (echo [ERROR] server\config\db.js missing)
if exist "server\models\Insight.js" (echo [OK] server\models\Insight.js) else (echo [ERROR] server\models\Insight.js missing)
if exist "server\controllers\insightController.js" (echo [OK] server\controllers\insightController.js) else (echo [ERROR] server\controllers\insightController.js missing)
if exist "server\routes\insightRoutes.js" (echo [OK] server\routes\insightRoutes.js) else (echo [ERROR] server\routes\insightRoutes.js missing)
if exist "server\utils\seedData.js" (echo [OK] server\utils\seedData.js) else (echo [ERROR] server\utils\seedData.js missing)
echo.

REM Check frontend files
echo Checking frontend files...
if exist "frontend\package.json" (echo [OK] frontend\package.json) else (echo [ERROR] frontend\package.json missing)
if exist "frontend\src\App.tsx" (echo [OK] frontend\src\App.tsx) else (echo [ERROR] frontend\src\App.tsx missing)
if exist "frontend\src\services\api.js" (echo [OK] frontend\src\services\api.js) else (echo [ERROR] frontend\src\services\api.js missing)
if exist "frontend\src\pages\Dashboard.jsx" (echo [OK] frontend\src\pages\Dashboard.jsx) else (echo [ERROR] frontend\src\pages\Dashboard.jsx missing)
if exist "frontend\src\components\Filters.jsx" (echo [OK] frontend\src\components\Filters.jsx) else (echo [ERROR] frontend\src\components\Filters.jsx missing)
if exist "frontend\src\components\Charts\IntensityChart.jsx" (echo [OK] frontend\src\components\Charts\IntensityChart.jsx) else (echo [ERROR] frontend\src\components\Charts\IntensityChart.jsx missing)
if exist "frontend\src\styles\dashboard.css" (echo [OK] frontend\src\styles\dashboard.css) else (echo [ERROR] frontend\src\styles\dashboard.css missing)
echo.

REM Check dependencies
echo Checking dependencies...
if exist "server\node_modules\" (
    echo [OK] Backend dependencies installed
) else (
    echo [WARNING] Backend dependencies not installed. Run: cd server ^&^& npm install
)

if exist "frontend\node_modules\" (
    echo [OK] Frontend dependencies installed
) else (
    echo [WARNING] Frontend dependencies not installed. Run: cd frontend ^&^& npm install
)
echo.

echo ===========================================
echo Verification Complete!
echo.
echo Next Steps:
echo 1. cd server ^&^& npm install
echo 2. npm run seed (one-time)
echo 3. npm run dev (in server)
echo 4. cd ..\frontend ^&^& npm install
echo 5. npm run dev (in frontend)
echo 6. Visit http://localhost:5173
echo.
echo Documentation:
echo - README.md - Full documentation
echo - QUICK_START.md - Quick setup guide
echo - DEPLOYMENT.md - Deployment instructions
echo - PROJECT_SUMMARY.md - Project overview
echo.
pause
