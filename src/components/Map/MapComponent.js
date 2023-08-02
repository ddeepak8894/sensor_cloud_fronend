import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { URL } from "../../config";
import "../Map/Map.css";
import { Button } from "react-bootstrap";

const MapComponent = (props) => {
  const { sensorId, zoomValue } = props;
  const [sensorData, setSensorData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const mapRef = useRef(null);
  const monitoringTimer = useRef(null);
  const monitoringDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

  const getPostitionParameterOfSensor = () => {
    axios
      .post(`${URL}/sensor/getSensorPosition`, {
        sensorId: sensorId,
      })
      .then((response) => {
        // Assuming the API response contains sensor data in the 'data' field
        setSensorData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  };

  useEffect(() => {
    if (isMonitoring) {
      // Fetch sensor data every 3 seconds while monitoring is active
      const interval = setInterval(getPostitionParameterOfSensor, 3000);

      // Set a timer to automatically stop monitoring after the specified duration
      monitoringTimer.current = setTimeout(() => {
        setIsMonitoring(false);
      }, monitoringDuration);

      // Clean up the interval and timer when monitoring is stopped or when the 'sensorId' changes
      return () => {
        clearInterval(interval);
        clearTimeout(monitoringTimer.current);
      };
    }
  }, [isMonitoring, sensorId]);

  useEffect(() => {
    // Fetch sensor data from the API endpoint
    getPostitionParameterOfSensor();
  }, [sensorId]);

  useEffect(() => {
    // Recenter the map when the longitude or latitude changes
    handleRecenter();
  }, [sensorData]);

  const handleRecenter = () => {
    if (sensorData) {
      const { latitudeLong, longitudeLong } = sensorData;
      if (mapRef.current) {
        mapRef.current.setView([latitudeLong, longitudeLong], zoomValue);
      }
    }
  };

  const handleMonitoring = () => {
    setIsMonitoring(true);
  };

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
  };

  if (!sensorData) {
    // Loading state or handle errors if data is not available
    return <div>Loading...</div>;
  }

  const { latitudeLong, longitudeLong, nameOfSensor } = sensorData;

  // Define the CSS classes for the monitoring buttons
  const activeMonitoringClass = "monitoring-active";
  const inactiveMonitoringClass = "monitoring-inactive";

  return (
    <div style={{ borderStyle: "solid", borderColor: "black" }}>
      {sensorData && (
        <MapContainer
          ref={mapRef}
          center={[latitudeLong, longitudeLong]}
          zoom={zoomValue}
          style={{ minHeight: "15cm", minWidth: "6cm", borderStyle: "solid", borderColor: "black" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[latitudeLong, longitudeLong]}>
            <Popup>{nameOfSensor}</Popup>
          </Marker>
        </MapContainer>
      )}

      {/* Apply the CSS class based on the monitoring state */}
      <Button
        variant={isMonitoring ? "danger" : "success"}
        onClick={isMonitoring ? handleStopMonitoring : handleMonitoring}
      >
        {isMonitoring ? "Stop Monitoring" : "Start Continuous Monitoring"}
      </Button>
    </div>
  );
};

export default MapComponent;
