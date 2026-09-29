function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = ['all', 'pending', 'completed', 'high'];

  const labels = {
    all: 'All',
    pending: 'Pending',
    completed: 'Completed',
    high: 'High Priority',
  };

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'active' : ''}
          onClick={() => onFilterChange(filter)}
        >
          {labels[filter]}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;