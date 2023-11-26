import { Col, Container, Row, Stack } from "react-bootstrap";
import SpeedometerGauge from "../../components/Speedometer/SpeedometerGauge";
import HumidityGauge from "../../components/Humidity/HumidityGauge";
import ThermometerGauge from "../../components/temperature/ThermometerGauge";
import Tank from "../../components/Tank";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import { useEffect, useState } from "react";
import MapComponent from "../../components/Map/MapComponent";
import { useLocation } from "react-router-dom";

function MyDashboard(props) {
  const [showTankMap, setShowTankMap] = useState(false);

const location = useLocation();

const { nameOfSensor,sensorId,sensorName,zoomValue } = location.state;

useEffect(()=>{
  console.log("----in dashboard page")
console.log(nameOfSensor)

},[nameOfSensor])


return   (


    <Container fluid style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Row>
            {" "}
            
              <Container fluid>
                 <Row>
                  <Col>
                    <SpeedometerGauge  nameOfSensor={nameOfSensor} />
                  </Col>
                  <Col>
                    <HumidityGauge nameOfSensor={nameOfSensor} />
                  </Col>
                  <Col>
                    <ThermometerGauge nameOfSensor={nameOfSensor} />
                  </Col>
                  <Col>
                    <ButtonSwitch nameOfSensor={nameOfSensor} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Tank
                        nameOfSensor={nameOfSensor}
                    />
                  </Col>
                  <Col>
                    {showTankMap ? (
                      <MapComponent
                        sensorId={sensorId}
                        sensorName={sensorName}
                        zoomValue={zoomValue}
                      />
                    ) : (
                      <h1>Sensor is not added... please add it</h1>
                    )}
                  </Col>

                </Row>
              </Container>
          
          </Row>
  </Container>
  ) 

}

export default MyDashboard;
