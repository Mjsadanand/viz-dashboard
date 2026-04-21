// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFileDownload, MdRefresh, MdWarning, MdBarChart, MdLocalFireDepartment, MdBolt, MdGpsFixed } from 'react-icons/md';
import { fetchInsights, fetchFilterOptions, fetchStatistics } from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import IntensityChart from '../components/Charts/IntensityChart';
import LikelihoodChart from '../components/Charts/LikelihoodChart';
import RelevanceChart from '../components/Charts/RelevanceChart';
import YearTrend from '../components/Charts/YearTrend';
import RegionCountryMap from '../components/Charts/RegionCountryMap';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [activePage, setActivePage] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadInitialData();
  }, [navigate]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [insightsRes, filtersRes, statsRes] = await Promise.all([
        fetchInsights(),
        fetchFilterOptions(),
        fetchStatistics()
      ]);

      setData(insightsRes.data);
      setFilterOptions(filtersRes.data);
      setStatistics(statsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filters) => {
    try {
      setLoading(true);
      setActiveFilters(filters);
      const response = await fetchInsights(filters);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to apply filters.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data.length) {
    return (
      <div className="admin-layout">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="main-content">
          <Navbar />
          <div className="content-area">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data.length) {
    return (
      <div className="admin-layout">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="main-content">
          <Navbar />
          <div className="content-area">
            <div className="error-state">
              <span className="error-icon"><MdWarning /></span>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className="main-content">
        <Navbar 
          isCollapsed={isCollapsed}
          onSearch={setSearchQuery}
        />
        
        <div className="content-area">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-left">
              <h1 className="page-title">Analytics Dashboard</h1>
              <p className="page-subtitle">Real-time data insights and visualizations</p>
            </div>
            <div className="header-right">
              <button className="btn-secondary">
                <MdFileDownload /> Export
              </button>
              <button className="btn-primary">
                <MdRefresh /> Refresh
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          {statistics && (
            <div className="stats-grid-modern">
              <div className="stat-card-modern purple">
                <div className="stat-card-header">
                  <div className="stat-label-modern">Total Records</div>
                  <div className="stat-period">/ Month</div>
                </div>
                <div className="stat-value-row">
                  <div className="stat-value-modern">{statistics.totalRecords?.toLocaleString() || 0}</div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 30" className="sparkline">
                      <polyline
                        points="0,25 20,20 40,15 60,18 80,10 100,12"
                        fill="none"
                        stroke="#667eea"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="12" r="2" fill="#667eea"/>
                    </svg>
                    <div className="mini-chart-label">23%</div>
                  </div>
                </div>
                <div className="stat-footer">
                  <span className="stat-change positive">+12% last week</span>
                </div>
              </div>

              <div className="stat-card-modern pink">
                <div className="stat-card-header">
                  <div className="stat-label-modern">Avg Intensity</div>
                  <div className="stat-period">/ Day</div>
                </div>
                <div className="stat-value-row">
                  <div className="stat-value-modern">{statistics.avgIntensity?.toFixed(1) || 0}</div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 30" className="sparkline">
                      <polyline
                        points="0,20 20,18 40,22 60,15 80,16 100,8"
                        fill="none"
                        stroke="#f093fb"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="8" r="2" fill="#f093fb"/>
                    </svg>
                    <div className="mini-chart-label pink">18%</div>
                  </div>
                </div>
                <div className="stat-footer">
                  <span className="stat-change negative">+18% last week</span>
                </div>
              </div>

              <div className="stat-card-modern blue">
                <div className="stat-card-header">
                  <div className="stat-label-modern">Avg Likelihood</div>
                  <div className="stat-period">/ Day</div>
                </div>
                <div className="stat-value-row">
                  <div className="stat-value-modern">{statistics.avgLikelihood?.toFixed(1) || 0}</div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 30" className="sparkline">
                      <polyline
                        points="0,15 20,14 40,16 60,15 80,17 100,16"
                        fill="none"
                        stroke="#4facfe"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="16" r="2" fill="#4facfe"/>
                    </svg>
                    <div className="mini-chart-label blue">15%</div>
                  </div>
                </div>
                <div className="stat-footer">
                  <span className="stat-change positive">+15% last week</span>
                </div>
              </div>

              <div className="stat-card-modern green">
                <div className="stat-card-header">
                  <div className="stat-label-modern">Avg Relevance</div>
                  <div className="stat-period">/ Day</div>
                </div>
                <div className="stat-value-row">
                  <div className="stat-value-modern">{statistics.avgRelevance?.toFixed(1) || 0}</div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 30" className="sparkline">
                      <polyline
                        points="0,22 20,19 40,20 60,14 80,12 100,10"
                        fill="none"
                        stroke="#43e97b"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="10" r="2" fill="#43e97b"/>
                    </svg>
                    <div className="mini-chart-label green">19%</div>
                  </div>
                </div>
                <div className="stat-footer">
                  <span className="stat-change positive">+19% last week</span>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />

          {loading && <div className="loading-overlay">
            <div className="spinner"></div>
          </div>}

          {/* Featured Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Top Intensity Topics</h3>
                  <p className="chart-subtitle">Most intense topics in the dataset</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <IntensityChart data={data} />
              </div>
            </div>

            <div className="chart-card chart-card-wide">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Geographic Distribution</h3>
                  <p className="chart-subtitle">Region-country heatmap overview</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <RegionCountryMap data={data} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="dashboard-footer-modern">
            <p>Showing {data.length} records • Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
