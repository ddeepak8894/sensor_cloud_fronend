import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { URL } from "../../config";
import "../Map/Map.css";
import { Button } from "react-bootstrap";
import { createMqttClient, subscribeToTopic } from "../../MQTT/utils/helpers";

const MapComponent = (props) => {
  const { sensorId, nameOfSensor } = props;
  const [sensorData, setSensorData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const mapRef = useRef(null);
  const mqttClientRef = useRef(null);
  const [latitudeLong, setLatitudeLong] = useState(0);
  const [longitudeLong, setLongitudeLong] = useState(0);

  const [zoomValue, setZoomValue] = useState(10); // Initial zoom value


  useEffect(() => {
    // const client = createMqttClient();
    console.log("inside gps systme --- " + nameOfSensor);
    mqttClientRef.current = createMqttClient();

    subscribeToTopic(
      mqttClientRef.current,
      `sensor_data/${nameOfSensor}`,
      (receivedTopic, receivedMessage) => {
        try {
          const parsedMessage = JSON.parse(receivedMessage);
          console.log(parsedMessage);
          const { longitudeLongEsp, latitudeLongEsp } = parsedMessage;

          setLatitudeLong(latitudeLongEsp);
          setLongitudeLong(longitudeLongEsp);

          if (mapRef.current) {
            mapRef.current.setView([latitudeLong, longitudeLong], zoomValue);
          }
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
  }, [nameOfSensor, zoomValue]);

  return (
    <div style={{ borderStyle: "solid", borderColor: "black" }}>
      <div>
        <input
          type="range"
          min="1"
          max="18" // Set the maximum zoom level as per your requirement
          value={zoomValue}
          onChange={(e) => {
            console.log("zoom value on change " + e.target.value);
            setZoomValue(e.target.value);
          }}
        />
        <label htmlFor="zoomRange">Zoom Level: {zoomValue}</label>
      </div>
      <MapContainer
        ref={mapRef}
        center={[latitudeLong, longitudeLong]}
        zoom={zoomValue}
        style={{
          minHeight: "15cm",
          minWidth: "6cm",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[latitudeLong, longitudeLong]}>
          <Popup>{nameOfSensor}</Popup>
        </Marker>
      </MapContainer>

      {/* Apply the CSS class based on the monitoring state */}
    </div>
  );
};

export default MapComponent;
