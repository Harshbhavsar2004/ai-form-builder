import React, { useEffect, useState } from 'react';
import ResponseGraph from './ResponseGraph'; // Assume you have the ResponseGraph component from the previous example

const App = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Response Data</h1>
      <ResponseGraph responseData={responseData} />
    </div>
  );
};

export default App;
