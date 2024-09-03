import FilterButtons from './components/filterButton';
import FilteredList from './components/filteredList';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5000/api/data?${query}`);
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (filters) => {
    fetchData(filters);
  };

  const uniqueCities = [...new Set(data.map(item => item.city))];
  const uniqueStatuses = [...new Set(data.map(item => item.status))];
  const uniqueTargets = [...new Set(data.map(item => item.target))];

  return (
    <div>
      <h1>시/도별 필터링 예제</h1>
      <FilterButtons
        cities={uniqueCities}
        statuses={uniqueStatuses}
        targets={uniqueTargets}
        handleFilter={handleFilter}
      />
      <FilteredList filteredData={filteredData} />
    </div>
  );
};

export default App;
