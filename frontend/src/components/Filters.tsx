// @ts-nocheck
import { useState } from 'react';
import { MdRefresh, MdFilterList, MdExpandMore } from 'react-icons/md';
import '../styles/filters.css';

const Filters = ({ onFilterChange, filterOptions }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="filters-container-compact">
      <div className="filters-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="filters-title">
          <MdFilterList />
          <span>Filters</span>
          {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
        </div>
        <div className="filters-actions">
          {activeFilterCount > 0 && (
            <button className="reset-button-mini" onClick={(e) => { e.stopPropagation(); handleReset(); }}>
              <MdRefresh /> Reset
            </button>
          )}
          <MdExpandMore className={`expand-icon ${isExpanded ? 'expanded' : ''}`} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="filters-grid-compact">
          <select name="end_year" value={filters.end_year} onChange={handleChange} className="filter-select-compact">
            <option value="">End Year</option>
            {filterOptions?.endYears?.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select name="topic" value={filters.topic} onChange={handleChange} className="filter-select-compact">
            <option value="">Topic</option>
            {filterOptions?.topics?.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <select name="sector" value={filters.sector} onChange={handleChange} className="filter-select-compact">
            <option value="">Sector</option>
            {filterOptions?.sectors?.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>

          <select name="region" value={filters.region} onChange={handleChange} className="filter-select-compact">
            <option value="">Region</option>
            {filterOptions?.regions?.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select name="pestle" value={filters.pestle} onChange={handleChange} className="filter-select-compact">
            <option value="">PESTLE</option>
            {filterOptions?.pestles?.map(pestle => (
              <option key={pestle} value={pestle}>{pestle}</option>
            ))}
          </select>

          <select name="source" value={filters.source} onChange={handleChange} className="filter-select-compact">
            <option value="">Source</option>
            {filterOptions?.sources?.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <select name="swot" value={filters.swot} onChange={handleChange} className="filter-select-compact">
            <option value="">SWOT</option>
            {filterOptions?.swots?.map(swot => (
              <option key={swot} value={swot}>{swot}</option>
            ))}
          </select>

          <select name="country" value={filters.country} onChange={handleChange} className="filter-select-compact">
            <option value="">Country</option>
            {filterOptions?.countries?.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select name="city" value={filters.city} onChange={handleChange} className="filter-select-compact">
            <option value="">City</option>
            {filterOptions?.cities?.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Filters;
