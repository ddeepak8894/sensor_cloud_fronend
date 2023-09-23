import React, { useEffect, useState } from 'react';
import { createMqttClient,publishMessage ,subscribeToTopic} from './utils/helpers';
import Tank from '../components/Tank';
import GaugeComponent from '../components/LiquideGauge/GaugeComponent';

function MqttComponent() {
  const [data, setData] = useState(0);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const client = createMqttClient();

    subscribeToTopic(client, 'outTopic', (receivedTopic, receivedMessage) => {
      try {
        const parsedMessage = JSON.parse(receivedMessage);

        const { data } = parsedMessage;

        console.log(`Received message on topic ${receivedTopic}:  Distance: ${data} cm`);

        setData(parsedMessage.data);
        setTopic(receivedTopic);
      } catch (error) {
        console.error(`Error parsing JSON message on topic ${receivedTopic}: ${error}`);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  // Function to publish a message when the "On" button is clicked
  const publishOn = () => {
    const client = createMqttClient();
    const message = '1';
    const topic = 'inTopic';
    publishMessage(client, topic, message);
  };

  // Function to publish a message when the "Off" button is clicked
  const publishOff = () => {
    const client = createMqttClient();
    const message = '2';
    const topic = 'inTopic';
    publishMessage(client, topic, message);
  };

  return (
    <div>
      <h1>Hare {`Received message on topic ${topic}: ${data}`}</h1>
      <button onClick={publishOn}>On</button>
      <button onClick={publishOff}>Off</button>
      <GaugeComponent value={data}/>
      <Tank currentValueMqtt={data} sensorId ={4} sensorName={"radha"}/>
    </div>
  );
}

export default MqttComponent;
