
import { useEffect, useRef, useState } from "react";
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
    Form,
    Row,
    Stack,
  } from "react-bootstrap";

  
function ButtonSwitch (props) {

    const [switchState, setSwitchState] = useState(false);
    const [currentStatus,setCurrentStatus] = useState("0")
    const mqttClientRef = useRef(null);
    const {nameOfSensor} = props

    const handleSwitchToggle = () => {
        setSwitchState(!switchState);
        publish(!switchState ? '1' : '0'); // Publishes the opposite state when the switch is toggled
      };

      // Function to publish MQTT message
  const publish = (state) => {
    const message = state;
    const topic = `${nameOfSensor}/button/status`;
    if (mqttClientRef.current) {
      publishMessage(mqttClientRef.current, topic, message);
    } else {
      console.error("MQTT client not initialized");
    }
  };  

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

          const { current_button_status } = parsedMessage;
          setCurrentStatus(current_button_status)
  

           // Update the speed state with the received motor speed
        } catch (error) {
          console.error(
            `Error parsing JSON message on topic ${receivedTopic}: ${error}`
          );
        }
      }
    );
    const switchLabelStyle = {
        fontSize: '4rem',
        color: switchState ? 'green' : 'red',
      };

    return () => {
      mqttClientRef.current.end();
    };
  }, []);
    return ( 
        <Container fluid>
        <div
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
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={switchState ? 'ON' : 'OFF'}
        checked={switchState}
        onChange={handleSwitchToggle}
        style={{ fontSize: '4rem', /* Adjust the font size as needed */ }}
        
      />
    </Form>
   
    <Button variant={currentStatus == '1' ? 'success' : 'danger'}>Current Status: ={currentStatus == '1' ? 'On':'Off'}</Button>

         
        
        </div>
        
      </Container>

     

     );
}

export default ButtonSwitch ;