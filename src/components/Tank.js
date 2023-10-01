import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { createMqttClient,subscribeToTopic } from '../MQTT/utils/helpers';
import "../components/Tank.css"

const Tank = (props) => {
  const [currentStatus, setCurrentStatus] = useState(true);
  const [currentValue, setCurrentValue] = useState(10);
  
  const [data, setData] = useState(0);
  const [maxValue,setMaxValue]=useState(100)
  
  const { sensorName, sensorId} = props;
  const [topic, setTopic] = useState(sensorId);
 
  const messageHandler=(receivedTopic, receivedMessage) => {
    if(receivedTopic==sensorId){
      setCurrentStatus(true)
    }else{
      setCurrentStatus(false)
    }
    try {
      const parsedMessage = JSON.parse(receivedMessage);

      const { data, maxValue} = parsedMessage;

      console.log(`Received message on topic ${receivedTopic}:  Distance: ${data} cm and max value = ${maxValue}`);
      setMaxValue(maxValue)
      setData(parsedMessage.data);
      setTopic(receivedTopic);
   
    } catch (error) {
      console.error(`Error parsing JSON message on topic ${receivedTopic}: ${error}`);
    }
  }
  useEffect(() => {
setCurrentStatus(false)
  }, [sensorId])

  useEffect(() => {
    const client = createMqttClient();

    subscribeToTopic(client, sensorId, messageHandler);

    return () => {
      client.end();
    };
  }, [data,sensorId]);
  return (
    <Container>
      <div className="charts">
        <Row>
          {currentStatus && (
            <Col>
              <div className="progress progress-bar-vertical" style={{ backgroundColor: "orange", minHeight: "90mm", minWidth: "5cm", border: "3px", borderStyle: "solid" }}>
                <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: `${(data/maxValue)*100}%`, width: "100mm" }}>
                  <span className="sr-only">{(data).toFixed(2)} Liters</span>
                </div>
              </div>
            </Col>
          )}
          <Col>
            {currentStatus ? (
              <h1 style={{ color: "green" }}>
                <span className="sr-only">{(data).toFixed(2)} Liters Water Present In {sensorName.split('-').slice(1).join('-')}</span>
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>{sensorName.split('-').slice(1).join('-')} is Off</h1>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Tank;
