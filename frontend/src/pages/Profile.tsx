// @ts-nocheck
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdEdit, MdSave, MdCancel } from 'react-icons/md'
import '../styles/profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('profile')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@blackcoffer.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    role: 'System Administrator',
    department: 'IT Operations',
    joinDate: '2023-01-15',
    lastLogin: new Date().toLocaleString()
  })

  const [editedProfile, setEditedProfile] = useState({ ...profile })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  const handleSearch = (query) => {
    console.log('Search query:', query)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({ ...profile })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile({ ...profile })
  }

  const handleSave = () => {
    setProfile({ ...editedProfile })
    setIsEditing(false)
    // Here you would typically call an API to save the profile
    console.log('Profile saved:', editedProfile)
  }

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    })
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
          <div className="profile-header">
            <h1 className="page-title">Profile Settings</h1>
            <p className="page-subtitle">Manage your account information and preferences</p>
          </div>

          <div className="profile-container">
            <div className="profile-card">
              <div className="profile-banner">
                <div className="profile-avatar">
                  <MdPerson />
                </div>
              </div>

              <div className="profile-info">
                <div className="profile-actions">
                  {!isEditing ? (
                    <button className="btn-edit" onClick={handleEdit}>
                      <MdEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="btn-save" onClick={handleSave}>
                        <MdSave /> Save Changes
                      </button>
                      <button className="btn-cancel" onClick={handleCancel}>
                        <MdCancel /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="profile-details">
                  <div className="detail-row">
                    <label>
                      <MdPerson className="detail-icon" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleChange}
                        className="detail-input"
                      />
                    ) : (
                      <span className="detail-value">{profile.name}</span>
                    )}
                  </div>

                  <div className="detail-row">
                    <label>
                      <MdEmail className="detail-icon" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleChange}
                        className="detail-input"
                      />
                    ) : (
                      <span className="detail-value">{profile.email}</span>
                    )}
                  </div>

                  <div className="detail-row">
                    <label>
                      <MdPhone className="detail-icon" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedProfile.phone}
                        onChange={handleChange}
                        className="detail-input"
                      />
                    ) : (
                      <span className="detail-value">{profile.phone}</span>
                    )}
                  </div>

                  <div className="detail-row">
                    <label>
                      <MdLocationOn className="detail-icon" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedProfile.location}
                        onChange={handleChange}
                        className="detail-input"
                      />
                    ) : (
                      <span className="detail-value">{profile.location}</span>
                    )}
                  </div>

                  <div className="detail-row">
                    <label>Role</label>
                    <span className="detail-value">{profile.role}</span>
                  </div>

                  <div className="detail-row">
                    <label>Department</label>
                    <span className="detail-value">{profile.department}</span>
                  </div>

                  <div className="detail-row">
                    <label>Join Date</label>
                    <span className="detail-value">{new Date(profile.joinDate).toLocaleDateString()}</span>
                  </div>

                  <div className="detail-row">
                    <label>Last Login</label>
                    <span className="detail-value">{profile.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-title">Dashboard viewed</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-title">Profile updated</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-title">Data exported</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
