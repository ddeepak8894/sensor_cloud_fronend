import React from 'react';
import Speedometer from "react-d3-speedometer";

function SpeedometerGauge({ value }) {
  return (
    <div>
      <Speedometer
        value={value}
        minValue={0}
        maxValue={100}
        needleColor="blue"
        startColor="red"
        endColor="green"
      />
    </div>
  );
}

export default SpeedometerGauge;
