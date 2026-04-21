// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTableChart, MdDownload, MdSearch, MdFilterList } from 'react-icons/md';
import { fetchInsights, fetchFilterOptions } from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import '../styles/dashboard.css';
import '../styles/datatable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('data');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to apply filters.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Title', 'Sector', 'Topic', 'Region', 'Country', 'Intensity', 'Likelihood', 'Relevance', 'Year'].join(','),
      ...data.map(item => [
        item.title || '',
        item.sector || '',
        item.topic || '',
        item.region || '',
        item.country || '',
        item.intensity || 0,
        item.likelihood || 0,
        item.relevance || 0,
        item.end_year || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_export_${new Date().toISOString()}.csv`;
    a.click();
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    return sortOrder === 'asc' 
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
              <h1 className="page-title"><MdTableChart /> Data Table</h1>
              <p className="page-subtitle">Browse and export raw data records</p>
            </div>
            <div className="header-right">
              <button className="btn-primary" onClick={handleExport}>
                <MdDownload /> Export CSV
              </button>
            </div>
          </div>

          <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />

          {loading && <div className="loading-overlay"><div className="spinner"></div></div>}

          <div className="data-table-container">
            <div className="table-header">
              <div className="table-stats">
                <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} records</span>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('title')}>
                      Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('sector')}>
                      Sector {sortField === 'sector' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('topic')}>
                      Topic {sortField === 'topic' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('region')}>
                      Region {sortField === 'region' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('country')}>
                      Country {sortField === 'country' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('intensity')}>
                      Intensity {sortField === 'intensity' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('likelihood')}>
                      Likelihood {sortField === 'likelihood' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('relevance')}>
                      Relevance {sortField === 'relevance' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('end_year')}>
                      Year {sortField === 'end_year' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item._id || index}>
                      <td className="title-cell" title={item.title}>{item.title || '-'}</td>
                      <td>{item.sector || '-'}</td>
                      <td>{item.topic || '-'}</td>
                      <td>{item.region || '-'}</td>
                      <td>{item.country || '-'}</td>
                      <td className="number-cell">{item.intensity || 0}</td>
                      <td className="number-cell">{item.likelihood || 0}</td>
                      <td className="number-cell">{item.relevance || 0}</td>
                      <td className="number-cell">{item.end_year || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-pagination">
              <button 
                className="pagination-btn" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          <div className="dashboard-footer-modern">
            <p>Total records: {data.length} • Updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
