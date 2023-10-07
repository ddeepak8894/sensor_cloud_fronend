import React from 'react';
import Thermometer from "react-thermometer-chart";

function ThermometerGauge({ value }) {
  return (
    <div>
      <Thermometer
        value={value}
        max={100}
        steps={10}
        format="°C"
        size="large"
        theme="light"
      />
    </div>
  );
}

export default ThermometerGauge;
