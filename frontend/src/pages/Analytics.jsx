import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTrendingUp, MdInsights } from 'react-icons/md';
import { fetchInsights, fetchFilterOptions, fetchStatistics } from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import LikelihoodChart from '../components/Charts/LikelihoodChart';
import RelevanceChart from '../components/Charts/RelevanceChart';
import YearTrend from '../components/Charts/YearTrend';
import '../styles/dashboard.css';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('analytics');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
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
      setError('Failed to load data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filters) => {
    try {
      setLoading(true);
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
          <div className="page-header">
            <div className="header-left">
              <h1 className="page-title"><MdInsights /> Advanced Analytics</h1>
              <p className="page-subtitle">Deep dive into data patterns and trends</p>
            </div>
          </div>

          {/* Analytics Metrics */}
          {statistics && (
            <div className="analytics-metrics">
              <div className="metric-card">
                <h4>Correlation Score</h4>
                <p className="metric-value">0.87</p>
                <span className="metric-label">Likelihood vs Relevance</span>
              </div>
              <div className="metric-card">
                <h4>Trend Strength</h4>
                <p className="metric-value">{statistics.avgIntensity?.toFixed(1)}</p>
                <span className="metric-label">Average Intensity</span>
              </div>
              <div className="metric-card">
                <h4>Data Quality</h4>
                <p className="metric-value">94%</p>
                <span className="metric-label">Completeness Index</span>
              </div>
            </div>
          )}

          <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />

          {loading && <div className="loading-overlay"><div className="spinner"></div></div>}

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Likelihood vs Relevance Analysis</h3>
                  <p className="chart-subtitle">Bubble chart showing correlation with intensity</p>
                </div>
              </div>
              <div className="chart-body">
                <LikelihoodChart data={data} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Regional Relevance Distribution</h3>
                  <p className="chart-subtitle">Comparative analysis across regions</p>
                </div>
              </div>
              <div className="chart-body">
                <RelevanceChart data={data} />
              </div>
            </div>

            <div className="chart-card chart-card-wide">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title"><MdTrendingUp /> Multi-Metric Trend Analysis</h3>
                  <p className="chart-subtitle">Historical trends for intensity, likelihood, and relevance</p>
                </div>
              </div>
              <div className="chart-body">
                <YearTrend data={data} />
              </div>
            </div>
          </div>

          <div className="dashboard-footer-modern">
            <p>Analytics for {data.length} records • Updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
