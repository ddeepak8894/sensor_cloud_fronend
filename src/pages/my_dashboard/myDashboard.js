import { Col, Container, Row, Stack } from "react-bootstrap";
import SpeedometerGauge from "../../components/Speedometer/SpeedometerGauge";
import HumidityGauge from "../../components/Humidity/HumidityGauge";
import ThermometerGauge from "../../components/temperature/ThermometerGauge";
import Tank from "../../components/Tank";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";

function MyDashboard(props) {

const {nameOfSensor}=props
  return   (


    <Container fluid style={{ paddingTop: '20px', paddingBottom: '20px' }}>
    <Stack direction="horizontal" gap={3}>
      <SpeedometerGauge nameOfSensor='vijay@gmail.com-block-43-upper-tank' />
      <HumidityGauge nameOfSensor='vijay@gmail.com-block-43-upper-tank' />
      <ThermometerGauge nameOfSensor='vijay@gmail.com-block-43-upper-tank' />
      <ButtonSwitch nameOfSensor='vijay@gmail.com-block-43-upper-tank'></ButtonSwitch>
    </Stack>
  </Container>
  ) 

}

export default MyDashboard;
