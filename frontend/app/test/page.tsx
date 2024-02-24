'use client';
import { testBackend } from '@/actions/backend';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const data = await testBackend()
        if (!data) {
          throw new Error('Failed to fetch data');
        }
      console.log(data)
        setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <p>Data received from server: {data.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;