import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../components/Tank.css"
import { Progress } from 'rsuite';


const Tank = () => {
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
    if (hasSamplesFromLastThreeSeconds){
        setCurrentValue(latestValue*100);
    }else{
        setCurrentValue(0)
    }
        
    
    
    console.log("value of current value = "+latestValue*100)
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
      
      <div className="charts">
        <Row> {
            currentStatus &&  <Col>    <div className="progress progress-bar-vertical" style={{backgroundColor:"orange",height:"90mm",width:"80mm",border:"3px",borderStyle:"solid"}}>
            <div className="progress-bar progress-bar-success progress-bar-striped active"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{height: `${currentValue}%`,width:"100mm"}}>
              <span className="sr-only">{(currentValue * 200).toFixed(2)}Liters</span>
            </div>
          </div></Col>
            }
          
  <Col>
    {
        currentStatus ? <h1 style={{color:"green"}}> <span className="sr-only">{(currentValue * 200).toFixed(2)} Liters Water Present In Tank</span></h1> :<h1 style={{color:"red"}}>Sensor at Location is Off</h1>
    }
  </Col>
     
            
            {/* <ProgressBar  style={{height:"50mm",width:"100mm",backgroundColor:"orange",fontSize:"large",fontWeight:"bold",transform:"rotate(270deg)",marginTop:"60px",marginBottom:"15mm"}} animated striped variant="success" now={currentValue} /> */}
           
        </Row>
    
 

</div>

      

      

 
   
    </Container>

  );
};

export default Tank;
