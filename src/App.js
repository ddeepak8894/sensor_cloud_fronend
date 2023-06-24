import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './pages/sign_in/SignIn';
import NavigateTest from './pages/testpages/TestNavigate';
import { Container } from 'react-bootstrap';
import CustomerPage from './pages/customer/Customer';
import SideBar from './components/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutPage from './components/logoutPage/logoutPage';


const App = () => (
 
  <Container fluid  >
    
      <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signIn" element={<NavigateTest />} />
      <Route path="/myPage" element={<CustomerPage />} />
      <Route path="/logout" element={<LogoutPage />} />

    </Routes>
    <ToastContainer  />
  </Router>
  
  </Container>

);

export default App;
