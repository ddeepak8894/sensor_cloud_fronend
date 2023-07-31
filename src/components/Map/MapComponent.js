import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { URL } from "../../config";

const MapComponent = (props) => {
  const [sensorData, setSensorData] = useState(null);
  const { sensorId, zoomValue } = props;

  const getPostitionParameterOfSensor = () => {
    axios
      .post(`${URL}/sensor/getSensorPosition`, {
        sensorId: sensorId,
      })
      .then((response) => {
        // Assuming the API response contains sensor data in the 'data' field
        setSensorData(response.data.data);
        const data = response.data.data;
        console.log(data.latitudeLong);
        console.log("longitude below and latitude ablove");
        console.log();
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  };

  useEffect(() => {
    // Fetch sensor data from the API endpoint
    console.log("***************************sensorId changed");
    getPostitionParameterOfSensor();
  }, [sensorId]);

  if (!sensorData) {
    // Loading state or handle errors if data is not available
    return <div>Loading...</div>;
  }

  const { latitudeLong, longitudeLong, nameOfSensor } = sensorData;

  return (
    <div style={{ borderStyle: "solid", borderColor: "black" }}>
      <MapContainer
        key={sensorId}
        center={[ latitudeLong,longitudeLong]}
        zoom={zoomValue}
        style={{ minHeight:"15cm",minWidth:"6cm", borderStyle: "solid", borderColor: "black" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[latitudeLong,longitudeLong]}>
          <Popup>{nameOfSensor}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
