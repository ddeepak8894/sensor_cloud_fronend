import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './pages/sign_in/SignIn';
import NavigateTest from './pages/testpages/TestNavigate';
import { Container } from 'react-bootstrap';
import CustomerPage from './pages/customer/Customer';
import SideBar from './components/SideBar';

const App = () => (
 
  <Container fluid  >
    
      <Router>
    <Routes>
      <Route path="/ss" element={<SignIn />} />
      <Route path="/signIn" element={<NavigateTest />} />
      <Route path="/" element={<CustomerPage />} />

    </Routes>
  </Router>
  </Container>

);

export default App;
