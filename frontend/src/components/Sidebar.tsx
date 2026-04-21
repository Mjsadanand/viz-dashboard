// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdAnalytics, MdShowChart, MdTableChart, MdLogout, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import '../styles/sidebar.css';

const Sidebar = ({ activePage, setActivePage, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: <MdDashboard />, label: 'Dashboard', path: '/dashboard' },
    { id: 'analytics', icon: <MdAnalytics />, label: 'Analytics', path: '/analytics' },
    { id: 'charts', icon: <MdShowChart />, label: 'Charts', path: '/charts' },
    { id: 'data', icon: <MdTableChart />, label: 'Data Table', path: '/data' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon"><MdDashboard /></span>
          {!isCollapsed && <span className="brand-text">Blackcoffer</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
        </button>
      </div>

      <div className="sidebar-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => {
              setActivePage(item.id);
              navigate(item.path);
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="menu-label">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="menu-item logout-btn" onClick={handleLogout}>
          <span className="menu-icon"><MdLogout /></span>
          {!isCollapsed && <span className="menu-label">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
