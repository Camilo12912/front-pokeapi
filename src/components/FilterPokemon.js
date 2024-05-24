import React from 'react';
import Select from 'react-select';

const FilterPokemon = ({ allMoves, allTypes, filters, setFilters }) => {
  const handleNameChange = (event) => {
    setFilters({ ...filters, name: event.target.value });
  };

  const handleTypeChange = (selectedTypes) => {
    const types = selectedTypes ? selectedTypes.map(type => type.value) : [];
    setFilters({ ...filters, types });
  };

  const handleMoveChange = (selectedMoves) => {
    const moves = selectedMoves ? selectedMoves.map(move => move.value) : [];
    setFilters({ ...filters, moves });
  };

  return (
    <div className="filter-pokemon">
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.name}
        onChange={handleNameChange}
        className="filter-input"
      />
      <Select
        options={allTypes.map(type => ({ value: type, label: type }))}
        isMulti
        placeholder="Select types..."
        value={filters.types.map(type => ({ value: type, label: type }))}
        onChange={handleTypeChange}
        className="filter-select"
      />
      <Select
        options={allMoves.map(move => ({ value: move, label: move }))}
        isMulti
        placeholder="Select moves..."
        value={filters.moves.map(move => ({ value: move, label: move }))}
        onChange={handleMoveChange}
        className="filter-select"
      />
    </div>
  );
};

export default FilterPokemon;
