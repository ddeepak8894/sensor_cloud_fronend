import React, { useEffect, useState } from 'react';
import { MQTT_CONFIG } from '../config';
import mqtt from 'mqtt-browser';

function MqttComponent() {
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const brokerUrl = `ws://${MQTT_CONFIG.MQTT_SERVER}:9001`;
    const options = {
      username: MQTT_CONFIG.MQTT_USERNAME,
      password: MQTT_CONFIG.MQTT_PASSWORD,
    };

    const client = mqtt.connect(brokerUrl, options);

    client.subscribe('outTopic');

    client.on('message', (receivedTopic, receivedMessage) => {
      setMessage(receivedMessage);
      setTopic(receivedTopic);
      console.log(`Received message on topic ${receivedTopic}: ${receivedMessage}`);
    });

    return () => {
      client.end();
    };
  }, []);

  // Function to publish a message when the "On" button is clicked
  const publishOn = () => {
    const client = mqtt.connect(`ws://${MQTT_CONFIG.MQTT_SERVER}:9001`, {
      username: MQTT_CONFIG.MQTT_USERNAME,
      password: MQTT_CONFIG.MQTT_PASSWORD,
    });

    const message = '1';
    const topic = 'inTopic';

    client.publish(topic, message, (error) => {
      if (!error) {
        console.log(`Published message "${message}" to topic "${topic}"`);
      } else {
        console.error(`Failed to publish message: ${error}`);
      }

      client.end();
    });
  };

  // Function to publish a message when the "Off" button is clicked
  const publishOff = () => {
    const client = mqtt.connect(`ws://${MQTT_CONFIG.MQTT_SERVER}:9001`, {
      username: MQTT_CONFIG.MQTT_USERNAME,
      password: MQTT_CONFIG.MQTT_PASSWORD,
    });

    const message = '2';
    const topic = 'inTopic';

    client.publish(topic, message, (error) => {
      if (!error) {
        console.log(`Published message "${message}" to topic "${topic}"`);
      } else {
        console.error(`Failed to publish message: ${error}`);
      }

      client.end();
    });
  };

  return (
    <div>
      <h1>Hare {`Received message on topic ${topic}: ${message}`}</h1>
      <button onClick={publishOn}>On</button>
      <button onClick={publishOff}>Off</button>
    </div>
  );
}

export default MqttComponent;
