// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdNotifications, MdMessage, MdPerson, MdKeyboardArrowDown, MdLogout, MdSettings } from 'react-icons/md';
import '../styles/navbar.css';

const Navbar = ({ isCollapsed, onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-left">
        <div className="search-bar">
          <span className="search-icon"><MdSearch /></span>
          <input 
            type="text" 
            placeholder="Search analytics, charts, data..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Notifications">
          <span className="notification-badge">3</span>
          <MdNotifications />
        </button>
        <button className="icon-btn" title="Messages">
          <MdMessage />
        </button>
        <div className="user-profile-wrapper">
          <div 
            className="user-profile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="avatar"><MdPerson /></div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrator</span>
            </div>
            <MdKeyboardArrowDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
          </div>
          
          {isDropdownOpen && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={() => {
                navigate('/profile');
                setIsDropdownOpen(false);
              }}>
                <MdPerson /> View Profile
              </button>
              <button className="dropdown-item" onClick={() => {
                navigate('/settings');
                setIsDropdownOpen(false);
              }}>
                <MdSettings /> Settings
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <MdLogout /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
