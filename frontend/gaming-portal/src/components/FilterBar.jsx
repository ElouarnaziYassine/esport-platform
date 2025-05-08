import React from 'react';
import './FilterBar.css';

function FilterBar() {
  return (
    <div className="filter-bar">
      <button className="filter-button">FILTER BY GAME ⬇</button>
      <button className="filter-button">FILTER BY TOURNAMENT ⬇</button>
    </div>
  );
}

export default FilterBar;
