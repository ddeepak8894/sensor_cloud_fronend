function sendUpperSensorData() {
    const data = counter % 101; // Generate values from 0 to 100
    const requestBody = {
      nameOfSensor: 'madhura@gmail.com-upper',
      data: data.toString()
    };
  
    axios.post('http://localhost:4000/api/sensor/addSensorData', requestBody)
      .then(response => {
        console.log('Upper Sensor Data sent successfully');
      })
      .catch(error => {
        console.error('Failed to send Upper Sensor data:', error);
      })
      .finally(() => {
        counter++;
        setTimeout(sendUpperSensorData, 11000); // Delay for 15 seconds before sending the next Upper Sensor data
      });
  }
  
  let counterDecrease = 100;
  
  function sendLowerSensorData() {
    const data = counterDecrease % 101; // Generate values from 0 to 100
    const requestBody = {
      nameOfSensor: 'madhura@gmail.com-lower',
      data: data.toString()
    };
  
    axios.post('http://localhost:4000/api/sensor/addSensorData', requestBody)
      .then(response => {
        console.log('Lower Sensor Data sent successfully');
      })
      .catch(error => {
        console.error('Failed to send Lower Sensor data:', error);
      })
      .finally(() => {
        counterDecrease--;
        if (counterDecrease === 0) {
          counterDecrease = 100;
        }
        setTimeout(sendLowerSensorData, 13000); // Delay for 20 seconds before sending the next Lower Sensor data
      });
  }
  
  sendUpperSensorData();
  sendLowerSensorData();