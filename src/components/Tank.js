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
  const [currentStatus,setCurrentStatus]= useState(true)
  const [currentValue,setCurrentValue]=useState(10)
  const {sensorId,sensorName,currentValueMqtt} = props
  let counter = 0;

 
  
  
  useEffect(() => {
    

    // const interval = setInterval(fetchData, 13000);

  }, [currentValueMqtt]);



  

  return (
    
    <Container>
      
      <div className="charts">
        <Row> {
            currentStatus &&  <Col>    <div className="progress progress-bar-vertical" style={{backgroundColor:"orange",minHeight:"90mm",minWidth:"5cm",border:"3px",borderStyle:"solid"}}>
            <div className="progress-bar progress-bar-success progress-bar-striped active"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{height: `${currentValueMqtt}%`,width:"100mm"}}>
              <span className="sr-only">{(currentValueMqtt * 200).toFixed(2)}Liters</span>
            </div>
          </div></Col>
            }
          
  <Col>
    {
        currentStatus ? <h1 style={{color:"green"}}> <span className="sr-only">{(currentValue * 200).toFixed(2)} Liters Water Present In {sensorName.split('-').slice(1).join('-')}</span></h1> :<h1 style={{color:"red"}}>{sensorName.split('-').slice(1).join('-')} is Off</h1>
    }
  </Col>
     
            
            {/* <ProgressBar  style={{height:"50mm",width:"100mm",backgroundColor:"orange",fontSize:"large",fontWeight:"bold",transform:"rotate(270deg)",marginTop:"60px",marginBottom:"15mm"}} animated striped variant="success" now={currentValue} /> */}
           
        </Row>
    
 

</div>

      

      

 
   
    </Container>

  );
};

export default Tank;
