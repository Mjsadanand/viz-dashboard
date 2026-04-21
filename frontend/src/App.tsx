// @ts-nocheck
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Charts from './pages/Charts'
import DataTable from './pages/DataTable'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './components/Login'
// import HowWeDo from './components/HowWeDo'  
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  return isAuthenticated ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {/* <HowWeDo /> */}
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/charts" 
            element={
              <ProtectedRoute>
                <Charts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/data" 
            element={
              <ProtectedRoute>
                <DataTable />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

