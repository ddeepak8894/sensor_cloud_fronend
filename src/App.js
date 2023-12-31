import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './pages/sign_in/SignIn';
import NavigateTest from './pages/testpages/TestNavigate';
import { Container } from 'react-bootstrap';
import CustomerPage from './pages/customer/Customer';
import CustomerTank from './pages/customer_tank/CustomerTank';
import SideBar from './components/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutPage from './components/logoutPage/logoutPage';
import MapComponent from './components/Map/MapComponent';
import AdminPage from './pages/admin/Admin';
import ErrorPage from './components/errorPage/ErrorPage';
import TestComponet from './MQTT/test_component';
import MqttComponent from './MQTT/mqtt_component.js';
import MyDashboard from './pages/my_dashboard/myDashboard';
import SpeedometerGauge from './components/Speedometer/SpeedometerGauge';
import ThermometerGauge from './components/temperature/ThermometerGauge';
import HumidityGauge from './components/Humidity/HumidityGauge';
import ButtonSwitch from './components/ButtonSwitch/ButtonSwitch';


const App = () => (
 
  <Container fluid  >
    
      <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signIn" element={<NavigateTest />} />
      <Route path="/myPage" element={<CustomerPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/sensorMap" element={<MapComponent />} />
      <Route path="/myTanks" element={<CustomerTank />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/myDashboard" element={<MyDashboard />} />
      <Route path="/mqtt" element={<MqttComponent />} />
      

    </Routes>
    <ToastContainer  />
  </Router>
  
  </Container>

);

export default App;
