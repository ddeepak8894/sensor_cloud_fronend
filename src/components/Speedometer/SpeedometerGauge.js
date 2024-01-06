import React, { useEffect, useRef, useState } from "react";
import Speedometer from "react-d3-speedometer";
import {
  createMqttClient,
  publishMessage,
  subscribeToTopic,
} from "../../MQTT/utils/helpers";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";

function SpeedometerGauge(props) {
  const [speed, setSpeed] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("off");
  const [showButtons, setShowButtons] = useState(false);
  const [showComponent,setShowComponent]=useState(false)

  const { nameOfSensor } = props;
  const mqttClientRef = useRef(null);

  useEffect(() => {}, [speed]);

  // Function to publish MQTT message using the existing client
  const publish = (state) => {
    if (mqttClientRef.current) {
      const message = state;
      const topic = `${nameOfSensor}/motor/control`;
      publishMessage(mqttClientRef.current, topic, message);
    } else {
      console.error("MQTT client not initialized");
    }
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

          const { current_motor_mode } = parsedMessage;
          setCurrentStatus(current_motor_mode);
          setShowComponent(true)
          const motorSpeed = getMotorSpeed(current_motor_mode);
          if(current_motor_mode != 'off'){
            setShowButtons(true)
          }

          setSpeed(motorSpeed); // Update the speed state with the received motor speed
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
  }, [nameOfSensor]);

  // Function to calculate motor speed based on motor mode
  const getMotorSpeed = (mode) => {
    let motorSpeed = 0;
    switch (mode) {
      case "on":
        motorSpeed = 0;
        break;
      case "off":
        motorSpeed = 0;
        break;
      case "half":
        motorSpeed = 50;
        break;
      case "full":
        motorSpeed = 100;
        break;
      case "quarter":
        motorSpeed = 25;
        break;
      case "clockwise":
        motorSpeed = 100;
        break;
      case "counterclockwise":
        motorSpeed = -100;
        break;
        // Implement logic for rotational movement if needed
        break;
      default:
        break;
    }
    return motorSpeed;
  };

  return (
    <Container fluid>
      {showComponent ?       <div
        style={{
          padding: "10px",
          borderStyle: "solid",
          borderWidth: "8px",
          borderRadius: "10px",
          
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Aligns items horizontally at the center
          justifyContent: "center", // Aligns items vertically at the center
          margin: "auto",
        }}
      >
        <h1>Motor Control Section <h3>{nameOfSensor}</h3></h1>
        <Speedometer
          value={speed}
          minValue={0}
          maxValue={100}
          height={200}
          width={200}
          needleColor="black"
          startColor="red"
          endColor="green"
        />

        <Button
          variant={speed == 0 && currentStatus == "off" ? "danger" : "success"}
        >
          {currentStatus}[{speed}]
        </Button>
        <hr className="my-4" />

        <Stack gap={2}>
          <Button
            variant={currentStatus == "off" ? "danger" : "success"}
            onClick={() => {
              setShowButtons(true);
              publish("on");
            }}
          >
            ON
          </Button>
          <Button
            variant={currentStatus !== "off" ? "danger" : "success"}
            onClick={() => {
              setShowButtons(false);
              publish("off");
            }}
          >
            OFF
          </Button>
        </Stack>
        <hr className="my-4" />
        {showButtons && (
          <Stack gap={3}>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button onClick={() => publish("quarter")}>25%</Button>{" "}
              <Button variant="warning" onClick={() => publish("half")}>
                50%
              </Button>
              <Button variant="success" onClick={() => publish("full")}>
                100%
              </Button>
            </ButtonGroup>

            <Button
              onClick={() => publish("clockwise")}
              variant={currentStatus != "clockwise" ? "danger" : "success"}
            >
              clockwise{" "}
            </Button>
            <Button
              onClick={() => publish("counterclockwise")}
              variant={
                currentStatus != "counterclockwise" ? "danger" : "success"
              }
            >
              {" "}
              Anticlockwise
            </Button>
          </Stack>
        )}
      </div> : <h1>Motor is off </h1>}

    </Container>
  );
}

export default SpeedometerGauge;
