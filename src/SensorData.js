import React, { useState, useEffect } from 'react';

const SensorData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.111.108.14:4000/api/sensorDataStore/getSensorDetails');
        const json = await response.json();
        // Reverse the data array to display the latest sensor data at the top
        setData(json.data.reverse());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Sensor Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.name_of_sensor}</td>
              <td>{sensor.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorData;
