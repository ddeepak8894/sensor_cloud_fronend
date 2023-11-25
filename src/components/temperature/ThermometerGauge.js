import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Container, Stack } from "react-bootstrap";
import Thermometer from "react-thermometer-component";
import { createMqttClient, subscribeToTopic } from "../../MQTT/utils/helpers";

function ThermometerGauge(props) {
  const [temperature, setTemperature] = useState(0);
  const { nameOfSensor } = props;
  const mqttClientRef = useRef(null);
  const celsiusTemperature = temperature.toFixed(2); // Temperature in Celsius (rounded to 2 decimal places)
  const fahrenheitTemperature = ((temperature * 9) / 5 + 32).toFixed(2); // Convert Celsius to Fahrenheit


  useEffect(() => {
    // const client = createMqttClient();
    mqttClientRef.current = createMqttClient();

    subscribeToTopic(
      mqttClientRef.current,
      `sensor_data/${nameOfSensor}`,
      (receivedTopic, receivedMessage) => {
        try {
          const parsedMessage = JSON.parse(receivedMessage);
          console.log(parsedMessage);

          const { temperature } = parsedMessage;
          setTemperature(temperature)


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
    <Container fluid>
    <div
      style={{
        padding: '10px',
        borderStyle: 'solid',
        borderWidth: '8px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
       // Optional: Adjust maximum width as needed
      }}
    >
      <h1>Temperature Section</h1>
      <Thermometer
        theme="light"
        value={temperature}
        max={70}
        steps={5}
        format="°C"
        size="large"
        height={300}
      />
      <hr className="my-4" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="horizontal" gap={3}>
          <Button variant="warning">{celsiusTemperature} ℃</Button>
          <Button variant="warning">{fahrenheitTemperature} ℉</Button>
        </Stack>
      </div>
    </div>

  
    </Container>
  );
}

export default ThermometerGauge;
