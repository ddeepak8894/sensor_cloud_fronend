import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TestChart = () => {
  const [chartData, setChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://3.111.108.14:4000/api/sensorDataStore/getSensorDetails');
      const { data } = await response.json();
      const filteredData = filterData(data);
      setChartData(filteredData);
      setScatterData(generateScatterData(filteredData));
      setBarData(generateBarData(filteredData));
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const filterData = data => {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000; // 10 minutes in milliseconds
    return data
      .filter(item => new Date(item.sampleTakenAt).getTime() >= tenMinutesAgo)
      .map(item => ({
        time: new Date(item.sampleTakenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: item.data,
      }));
  };

  const generateScatterData = data => {
    // Generate scatter plot data based on the line chart data
    return data.map(item => ({
      x: item.time,
      y: item.value,
    }));
  };

  const generateBarData = data => {
    // Generate bar chart data based on the line chart data
    return data.map(item => ({
      time: item.time,
      value: item.value,
    }));
  };

  const handleClearData = async () => {
    try {
      await fetch('http://3.111.108.14:4000/api/sensorDataStore/deleteAll', { method: 'GET' });
      fetchData();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <div className="container">
      <h2>Test Chart</h2>
      <button onClick={handleClearData}>Clear All Data</button>
      <div className="charts">
        <LineChart width={1100} height={300} data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeWidth={2} strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
        <ScatterChart width={1000} height={300} data={scatterData}>
          <XAxis dataKey="x" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeWidth={2} strokeDasharray="5 5" />
          <Tooltip />
          <Scatter dataKey="y" fill="#82ca9d" />
        </ScatterChart>
        <BarChart width={1000} height={300} data={barData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeWidth={2} strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default TestChart;
