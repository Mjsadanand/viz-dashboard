// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdShowChart } from 'react-icons/md';
import { fetchInsights, fetchFilterOptions } from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import IntensityChart from '../components/Charts/IntensityChart';
import LikelihoodChart from '../components/Charts/LikelihoodChart';
import RelevanceChart from '../components/Charts/RelevanceChart';
import YearTrend from '../components/Charts/YearTrend';
import RegionCountryMap from '../components/Charts/RegionCountryMap';
import '../styles/dashboard.css';

const Charts = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('charts');
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
      const [insightsRes, filtersRes] = await Promise.all([
        fetchInsights(),
        fetchFilterOptions()
      ]);
      setData(insightsRes.data);
      setFilterOptions(filtersRes.data);
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
              <h1 className="page-title"><MdShowChart /> All Visualizations</h1>
              <p className="page-subtitle">Comprehensive chart collection for data exploration</p>
            </div>
          </div>

          <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />

          {loading && <div className="loading-overlay"><div className="spinner"></div></div>}

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Intensity Bar Chart</h3>
                  <p className="chart-subtitle">Top 15 topics by intensity level</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <IntensityChart data={data} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Likelihood Bubble Chart</h3>
                  <p className="chart-subtitle">Correlation analysis with intensity</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <LikelihoodChart data={data} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Regional Relevance</h3>
                  <p className="chart-subtitle">Relevance distribution by region</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <RelevanceChart data={data} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Year Trend Line Chart</h3>
                  <p className="chart-subtitle">Multi-metric trends over time</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <YearTrend data={data} />
              </div>
            </div>

            <div className="chart-card chart-card-wide">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Geographic Heatmap</h3>
                  <p className="chart-subtitle">Region-country intensity distribution</p>
                </div>
                <button className="chart-menu-btn">⋮</button>
              </div>
              <div className="chart-body">
                <RegionCountryMap data={data} />
              </div>
            </div>
          </div>

          <div className="dashboard-footer-modern">
            <p>Displaying {data.length} data points • Updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
