import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { createMqttClient, publishMessage, subscribeToTopic } from "../MQTT/utils/helpers";
import "../components/Tank.css";

const Tank = (props) => {
  const [currentStatus, setCurrentStatus] = useState("true");
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
  const [data, setData] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const { sensorName, sensorId,sensorNameFull } = props;
  const [topic, setTopic] = useState(sensorNameFull);

  const messageHandler = (receivedTopic, receivedMessage) => {
    if (receivedTopic == sensorId) {
      setCurrentStatus(true);
    } else {
      setCurrentStatus(false);
    }
    try {
      const parsedMessage = JSON.parse(receivedMessage);
      const { data, maxValue,currentStatus } = parsedMessage;
      setLastUpdatedAt(Date.now());
      console.log(
        `Received message on topic ${receivedTopic}:  Distance: ${data} cm and max value = ${maxValue} and current status ${currentStatus} =`
      );
      setMaxValue(maxValue);
      setData(parsedMessage.data);
      setTopic(receivedTopic);
      setCurrentStatus(currentStatus);
    } catch (error) {
      console.error(
        `Error parsing JSON message on topic ${receivedTopic}: ${error}`
      );
    }
  };
  // Function to publish a message when the "On" button is clicked
  const publishOn = () => {
    const client = createMqttClient();
    const message = '1';
    const topic = `${sensorName}/change_status`;
    publishMessage(client, topic, message);
  };

  // Function to publish a message when the "Off" button is clicked
  const publishOff = () => {
    const client = createMqttClient();
    const message = '2';
    const topic = `${sensorName}/change_status`;
    publishMessage(client, topic, message);
  };
  useEffect(() => {
setData(0)
setLastUpdatedAt(formatTimestamp(Date.now()))
setCurrentStatus("not yet updated")
  }, [sensorNameFull]);
  useEffect(() => {
    const client = createMqttClient();
    subscribeToTopic(client, `sensor_data/${sensorNameFull}`, messageHandler);
    return () => {
      client.end();
    };
  }, [data, sensorId,sensorNameFull]);

  // Function to format a timestamp as a human-readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format as date and time
  };

  return (
    <Container>
      <div className="charts">
        <Row style={{marginBottom:"10px"}}>
          {" "}

        </Row>

        <Row>
          {currentStatus != 'not yet updated' && (
            <Col>
            
              <div
                className="progress progress-bar-vertical"
                style={{
                  backgroundColor: "orange",
                  minHeight: "90mm",
                  minWidth: "5cm",
                  border: "3px",
                  borderStyle: "solid",
                }}
              >
                <div
                  className="progress-bar progress-bar-success progress-bar-striped active"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    height: `${(data / maxValue) * 100}%`,
                    width: "100mm",
                  }}
                >
                  <span className="sr-only">{data.toFixed(2)} Liters</span>
                </div>
              </div>
            </Col>
          )}
          <Col>
            {currentStatus != 'not yet updated' ? (
              <div>
                <h1 style={{ color: "green" }}>
                  <span className="sr-only">
                    {data.toFixed(2)} Liters Water Present In{" "}
                    {sensorName.split("-").slice(1).join("-")}
                  </span>
                </h1>
                {currentStatus == 'not yet updated' ? "":                <div>
                <h1>
                  Last Updated At:{" "}
                  <Badge bg="success">{formatTimestamp(lastUpdatedAt)}</Badge>
                </h1>
                <Button variant="success" size="lg" onClick={publishOn}>On </Button>
                <Button variant="danger" size="lg" onClick={publishOff}>Off </Button>
                
                </div>}

           
                <Stack gap={1} style={{borderStyle:"dashed", borderColor:"black"}}>
                  {currentStatus == 'not yet updated' ?<h3 color="red">Sensor is Off </h3>:<Button variant={currentStatus == 'on' ?"danger": "success"} size="lg">Current status is {currentStatus=='on'?"off":"on" } </Button>}
                
           
          </Stack>
              </div>
            ) : (
              <h1 style={{ color: "red" }}>
                {sensorName.split("-").slice(1).join("-")} is Off
              </h1>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Tank;
