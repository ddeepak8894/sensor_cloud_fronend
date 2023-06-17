import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './pages/sign_in/SignIn';
import NavigateTest from './pages/testpages/TestNavigate';
import { Container } from 'react-bootstrap';

const App = () => (
 
  <Container  >
      <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signIn" element={<NavigateTest />} />

    </Routes>
  </Router>
  </Container>

);

export default App;
