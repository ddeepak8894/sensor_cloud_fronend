import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ErrorPage.css'; // You can define your own CSS styles
import dogImage from "../../assets/360_F_565202786_towUjm2KMittPXHT7yF7H4SFPAxv0xjD.jpg"
function ErrorPage() {
  return (
    <Container className="error-page">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={10} sm={8} md={6} lg={4} className="text-center">
        <img src={dogImage} alt="Error" className="error-image" />
          <h1>Oops, something went wrong!</h1>
          <p>We are working to fix the issue. Please try again later.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;
