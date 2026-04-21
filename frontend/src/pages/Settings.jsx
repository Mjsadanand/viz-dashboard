import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { 
  MdNotifications, 
  MdSecurity, 
  MdLanguage, 
  MdPalette, 
  MdEmail,
  MdToggleOn,
  MdToggleOff 
} from 'react-icons/md'
import '../styles/settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('settings')
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      updates: true,
      reports: true
    },
    appearance: {
      theme: 'light',
      sidebarCollapsed: false
    },
    language: 'en',
    security: {
      twoFactor: false,
      sessionTimeout: '30'
    }
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  const handleSearch = (query) => {
    console.log('Search query:', query)
  }

  const handleToggle = (section, setting) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting]
      }
    }))
  }

  const handleChange = (section, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value
      }
    }))
  }

  const handleSave = () => {
    // Here you would typically call an API to save settings
    console.log('Settings saved:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div className="dashboard-container">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className="main-content">
        <Navbar isCollapsed={isCollapsed} onSearch={handleSearch} />
        
        <div className="content-area">
          <div className="settings-header">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your application preferences and configurations</p>
          </div>

          <div className="settings-container">
            {/* Notifications Settings */}
            <div className="settings-card">
              <div className="settings-card-header">
                <MdNotifications className="settings-icon" />
                <div>
                  <h3>Notifications</h3>
                  <p>Configure how you receive notifications</p>
                </div>
              </div>
              
              <div className="settings-card-body">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email Notifications</label>
                    <span>Receive notifications via email</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('notifications', 'email')}
                  >
                    {settings.notifications.email ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Push Notifications</label>
                    <span>Enable push notifications in browser</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('notifications', 'push')}
                  >
                    {settings.notifications.push ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Product Updates</label>
                    <span>Get notified about new features</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('notifications', 'updates')}
                  >
                    {settings.notifications.updates ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Weekly Reports</label>
                    <span>Receive weekly analytics reports</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('notifications', 'reports')}
                  >
                    {settings.notifications.reports ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="settings-card">
              <div className="settings-card-header">
                <MdPalette className="settings-icon" />
                <div>
                  <h3>Appearance</h3>
                  <p>Customize the look and feel</p>
                </div>
              </div>
              
              <div className="settings-card-body">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Theme</label>
                    <span>Choose your preferred theme</span>
                  </div>
                  <select 
                    className="setting-select"
                    value={settings.appearance.theme}
                    onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Sidebar Collapsed by Default</label>
                    <span>Start with collapsed sidebar</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('appearance', 'sidebarCollapsed')}
                  >
                    {settings.appearance.sidebarCollapsed ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="settings-card">
              <div className="settings-card-header">
                <MdLanguage className="settings-icon" />
                <div>
                  <h3>Language & Region</h3>
                  <p>Set your preferred language</p>
                </div>
              </div>
              
              <div className="settings-card-body">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Language</label>
                    <span>Choose your display language</span>
                  </div>
                  <select 
                    className="setting-select"
                    value={settings.language}
                    onChange={(e) => handleChange('language', null, e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="settings-card">
              <div className="settings-card-header">
                <MdSecurity className="settings-icon" />
                <div>
                  <h3>Security</h3>
                  <p>Manage your security preferences</p>
                </div>
              </div>
              
              <div className="settings-card-body">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Two-Factor Authentication</label>
                    <span>Add an extra layer of security</span>
                  </div>
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggle('security', 'twoFactor')}
                  >
                    {settings.security.twoFactor ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Session Timeout</label>
                    <span>Auto logout after inactivity (minutes)</span>
                  </div>
                  <select 
                    className="setting-select"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn-save" onClick={handleSave}>
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
