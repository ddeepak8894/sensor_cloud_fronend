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
//to end the client 
export function endMqttClient(client) {
  if (client && client.end) {
    client.end();
  }
}
// Function to publish an MQTT message
export function publishMessage(client,topic, message) {
  if (client.connected) {
    client.publish(topic, message, (error) => {
      if (!error) {
        console.log(`Published message "${message}" to topic "${topic}"`);
      } else {
        console.error(`Failed to publish message: ${error}`);
      }
    });
  } else {
    console.error('MQTT client is not connected');
  }
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

export function checkRecentMessagesOnTopic(topic) {
  const client = createMqttClient();

  return new Promise((resolve, reject) => {
    let receivedMessage = false;
    let timer;

    client.on('message', (receivedTopic) => {
      if (receivedTopic === topic) {
        receivedMessage = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
          receivedMessage = false;
          client.end();
          resolve(false);
        }, 400); // Reset receivedMessage after 400ms
      }
    });

    client.on('connect', () => {
      client.subscribe(topic, (err) => {
        if (err) {
          client.end();
          reject(err);
        } else {
          timer = setTimeout(() => {
            client.end();
            resolve(receivedMessage);
          }, 400); // Resolve after 400ms if no new message
        }
      });
    });

    client.on('error', (err) => {
      client.end();
      reject(err);
    });
  });
}