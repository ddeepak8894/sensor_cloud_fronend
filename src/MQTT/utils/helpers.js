import mqtt from 'mqtt-browser';
import { MQTT_CONFIG } from '../../config';

// Function to create an MQTT client
export function createMqttClient() {
  const brokerUrl = `ws://${MQTT_CONFIG.MQTT_SERVER}:9001`;
  const options = {
    username: MQTT_CONFIG.MQTT_USERNAME,
    password: MQTT_CONFIG.MQTT_PASSWORD,
  };
  return mqtt.connect(brokerUrl, options);
}

// Function to publish an MQTT message
export function publishMessage(client, topic, message) {
  client.publish(topic, message, (error) => {
    if (!error) {
      console.log(`Published message "${message}" to topic "${topic}"`);
    } else {
      console.error(`Failed to publish message: ${error}`);
    }
    client.end();
  });
}

// Function to subscribe to an MQTT topic
export function subscribeToTopic(client, topic, messageHandler) {
  client.subscribe(topic, (error) => {
    if (!error) {
      console.log(`Subscribed to topic "${topic}"`);
    } else {
      console.error(`Failed to subscribe to topic "${topic}": ${error}`);
    }
  });

  client.on('message', (receivedTopic, receivedMessage) => {
    messageHandler(receivedTopic, receivedMessage);
  });
}
