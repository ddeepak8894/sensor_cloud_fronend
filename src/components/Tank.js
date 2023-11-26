import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import {
  createMqttClient,
  publishMessage,
  subscribeToTopic,
} from "../MQTT/utils/helpers";
import "../components/Tank.css";

const Tank = (props) => {
  const [currentStatus, setCurrentStatus] = useState("true");
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
  const [data, setData] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const {  sensorNameFull } = props;
  const [topic, setTopic] = useState(sensorNameFull);
  const { nameOfSensor } = props;
  const mqttClientRef = useRef(null);
  const [showComponent,setShowComponent]=useState(false)


  // Function to format a timestamp as a human-readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format as date and time
  };
  useEffect(() => {
    // const client = createMqttClient();
    mqttClientRef.current = createMqttClient();
setShowComponent(false)
    subscribeToTopic(
      mqttClientRef.current,
      `sensor_data/${nameOfSensor}`,
      (receivedTopic, receivedMessage) => {
        try {
          const parsedMessage = JSON.parse(receivedMessage);
          console.log(parsedMessage);
          setShowComponent(true)
          const { data } = parsedMessage;
          setData(data);

        } catch (error) {
          console.error(
            `Error parsing JSON message on topic ${receivedTopic}: ${error}`
          );
        }
      }
    );

    return () => {
      mqttClientRef.current.end();
    };
  }, []);
  return (
    <Container>
      {
        showComponent ?       <div className="charts">
        <Row style={{ marginBottom: "10px" }}> </Row>

        <Row>
          {currentStatus != "not yet updated" && (
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
            {currentStatus != "not yet updated" ? (
              <div>
                <h1 style={{ color: "green" }}>
                  <span className="sr-only">
                    {data.toFixed(2)} Liters Water Present In{" "}
                    
                  </span>
                </h1>
                {currentStatus == "not yet updated" ? (
                  ""
                ) : (
                  <div>
                    <h1>
                      Last Updated At:{" "}
                      <Badge bg="success">
                        {formatTimestamp(lastUpdatedAt)}
                      </Badge>
                    </h1>
                  </div>
                )}

                {currentStatus == "not yet updated" ? (
                  <h3 color="red">Sensor is Off </h3>
                ) : (
                  <Button
                    variant={currentStatus == "on" ? "danger" : "success"}
                    size="lg"
                  >
                    Current status is {currentStatus == "on" ? "off" : "on"}{" "}
                  </Button>
                )}
              </div>
            ) : (
              <h1 style={{ color: "red" }}>
                {nameOfSensor} is Off
              </h1>
            )}
          </Col>
        </Row>
      </div> :  <h1>Distance Sensor is Off</h1>
      }

    </Container>
  );
};

export default Tank;
