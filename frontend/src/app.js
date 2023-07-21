import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './components/chart';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="App">
      <h1>Sensor Data Chart</h1>
      {data.length > 0 ? <Chart data={data} /> : <p>Loading data...</p>}
    </div>
  );
}

export default App;
