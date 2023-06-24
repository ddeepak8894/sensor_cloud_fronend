import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../components/VolumeChart.css"

const VolumeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [currentStatus,setCurrentStatus]= useState(false)
  const [currentValue,setCurrentValue]=useState(10)

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
    const tenMinutesAgo = Date.now() - 8 * 1000; // 10 minutes in milliseconds
    const threeSecondsAgo = Date.now() - 3 * 1000; // 3 seconds in milliseconds

    const filteredData = data.filter(item => new Date(item.sampleTakenAt).getTime() >= tenMinutesAgo);
    const valueArray=data.map(e=>({value: e.data}))
  
    const hasSamplesFromLastThreeSeconds = filteredData.some(
      item => new Date(item.sampleTakenAt).getTime() >= threeSecondsAgo
    );
    const latestValue = valueArray[valueArray.length-1].value/20;

    setCurrentStatus(hasSamplesFromLastThreeSeconds);
    setCurrentValue(latestValue*100);
   
    setCurrentStatus(hasSamplesFromLastThreeSeconds);
    return data
      .filter(item => new Date(item.sampleTakenAt).getTime() >= tenMinutesAgo)
      .map(item => ({
        time: new Date(item.sampleTakenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: item.data *1000,
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
      value: item.value*1000,
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
    
    <Container>
      <Row>
      <Col>
      <div className="charts" >
      {currentStatus ? <Button style={{marginBottom:10,color:"yellow",fontSize:"large",fontWeight:"bold"}} variant="success">Sensor Is Live{filterData.value}</Button> :<Button style={{marginBottom:10,color:"yellow",fontSize:"large",fontWeight:"bold"}} variant="danger">Sensor is Off</Button>}
       {currentStatus &&     <LineChart width={500} height={300} data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="orange" strokeWidth={2} strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="red" />
        </LineChart>}
    
     </div></Col>
      </Row>
      
      

 
   
    </Container>

  );
};

export default VolumeChart;
