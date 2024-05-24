import React from 'react';

const SortOptions = ({ sortType, setSortType, sortOrder, setSortOrder }) => {
  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="sort-options">
      <label>
        Sort by:
        <select value={sortType} onChange={handleSortTypeChange}>
          <option value="name">Name</option>
          <option value="number">Number</option>
        </select>
      </label>
      <label>
        Order:
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};

export default SortOptions;
