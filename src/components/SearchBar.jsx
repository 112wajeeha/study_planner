function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search by title or subject..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;