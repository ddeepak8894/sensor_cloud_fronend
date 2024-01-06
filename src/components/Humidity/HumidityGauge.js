import { useEffect, useRef, useState } from "react";
import { createMqttClient, subscribeToTopic } from "../../MQTT/utils/helpers";
import Speedometer from "react-d3-speedometer";
import { Button, Container } from "react-bootstrap";

function HumidityGauge (props) {
    const mqttClientRef = useRef(null);
    const [humidity,setHumidity] =useState(0)
    const [showComponent,setShowComponent]=useState(false)
    const {nameOfSensor} = props

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
    
              const { humidity } = parsedMessage;
              setHumidity(humidity)
              setShowComponent(true)
    
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
           <h1>Humidity Section <h3>{nameOfSensor}</h3></h1>
          <Speedometer
            value={humidity.toFixed(2)}
            minValue={0}
            maxValue={100}
            height={200}
            width={200}
            needleColor="black"
            startColor="red"
            endColor="green"
          />
         
          <Button variant="primary">{humidity.toFixed(2)}% Moisture</Button>
        </div> : <h1>Humidity Section is off</h1>}
  
        
      </Container>

        
     );
}

export default HumidityGauge ;