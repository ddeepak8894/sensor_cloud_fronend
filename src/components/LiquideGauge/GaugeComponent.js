import React from 'react';
import LiquidGauge from 'react-liquid-gauge';

function GaugeComponent({ value }) {
  const gaugeOptions = {
    value: value, // The value you want to display on the gauge
    width: 200,   // Width of the gauge
    height: 200,  // Height of the gauge
    margin: 0.05, // Margin of the gauge (0.05 = 5% margin)
    textSize: 0.75, // Text size as a percentage of the gauge's radius
    waveFrequency: 2, // Frequency of the wave (number of complete waves)
    waveAmplitude: 0.05, // Amplitude of the wave (height of the wave)
    waveRise: true, // Whether the wave should rise as the value increases
    waveAnimateTime: 500, // Duration of the wave animation in milliseconds
  };

  return (
    <div>
      <LiquidGauge {...gaugeOptions} />
    </div>
  );
}

export default GaugeComponent;
