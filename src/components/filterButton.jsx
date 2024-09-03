const FilterButtons = ({ cities, statuses, targets, handleFilter }) => {
  return (
    <div>
      <h2>Filter Options</h2>
      <div>
        <label>
          City:
          <select onChange={(e) => handleFilter({ city: e.target.value })}>
            <option value="">All</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select onChange={(e) => handleFilter({ status: e.target.value })}>
            <option value="">All</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          Target:
          <select onChange={(e) => handleFilter({ target: e.target.value })}>
            <option value="">All</option>
            {targets.map((target, index) => (
              <option key={index} value={target}>{target}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterButtons;
