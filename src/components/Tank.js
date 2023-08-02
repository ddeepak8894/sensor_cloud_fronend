import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../components/Tank.css"
import { Progress } from 'rsuite';
import { URL } from '../config';
import axios from 'axios';


const Tank = (props) => {
  const [chartData, setChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [currentStatus,setCurrentStatus]= useState(false)
  const [currentValue,setCurrentValue]=useState(10)
  const {sensorId,sensorName} = props
  let counter = 0;

 
  
  
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 13000);

    return () => {
      clearInterval(interval);
    };
  }, [sensorId]);

  const fetchData = async () => {
    const body ={
      sensorId
    }
    axios.post(`${URL}/sensor/getSensorData`,body).then((res)=>{
      console.log(res.data.data)
      filterData(res.data.data);   
    })
  };

  const filterData = data => {
    const tenMinutesAgo = Date.now() - 1000 * 1000; // 10 minutes in milliseconds
    const threeSecondsAgo = Date.now() - 600 * 1000; // 3 seconds in milliseconds

    const filteredData = data.filter(e => new Date(e.lastUpdatedAt).getTime()>= tenMinutesAgo); 
    const hasSamplesFromLastThreeSeconds = filteredData.some(
      item => new Date(item.lastUpdatedAt).getTime() >= threeSecondsAgo
    );
  
   

    setCurrentStatus(hasSamplesFromLastThreeSeconds);
    if (hasSamplesFromLastThreeSeconds ){
        setCurrentValue(data[data.length -1].data);
    }else{
        setCurrentValue(0)
    }
        
    
    
    
    setCurrentStatus(hasSamplesFromLastThreeSeconds);
    return data
      .filter(item => new Date(item.sampleTakenAt).getTime() >= tenMinutesAgo)
      .map(item => ({
        time: new Date(item.sampleTakenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: item.data *1000,
      }));
  };


  return (
    
    <Container>
      
      <div className="charts">
        <Row> {
            currentStatus &&  <Col>    <div className="progress progress-bar-vertical" style={{backgroundColor:"orange",minHeight:"90mm",minWidth:"5cm",border:"3px",borderStyle:"solid"}}>
            <div className="progress-bar progress-bar-success progress-bar-striped active"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{height: `${currentValue}%`,width:"100mm"}}>
              <span className="sr-only">{(currentValue * 200).toFixed(2)}Liters</span>
            </div>
          </div></Col>
            }
          
  <Col>
    {
        currentStatus ? <h1 style={{color:"green"}}> <span className="sr-only">{(currentValue * 200).toFixed(2)} Liters Water Present In Tank</span></h1> :<h1 style={{color:"red"}}>{sensorName} is Off</h1>
    }
  </Col>
     
            
            {/* <ProgressBar  style={{height:"50mm",width:"100mm",backgroundColor:"orange",fontSize:"large",fontWeight:"bold",transform:"rotate(270deg)",marginTop:"60px",marginBottom:"15mm"}} animated striped variant="success" now={currentValue} /> */}
           
        </Row>
    
 

</div>

      

      

 
   
    </Container>

  );
};

export default Tank;
