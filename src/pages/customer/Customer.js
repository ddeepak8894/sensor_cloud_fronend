import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TestChart from "../../components/TestChart";
import VolumeChart from "../../components/VolumeChart";

function CustomerPage() {


    return (
        <Container fluid  >
            <Row >
        <Col> 
        <VolumeChart></VolumeChart>
 
        </Col>
        <Col>
        <Button variant="success">Success</Button>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title style={{fontWeight:"bold",fontSize:"large"}}><h1>"100000"</h1></Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
       
      </Card.Body>
    </Card>
        </Col>
        </Row>
            <Row>
<table className="table table-hover table-dark">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Reset The Value</td>
      
      <td> <Button variant="secondary">Secondary</Button></td>
    </tr>
    <tr>
      
      <td>Stop The sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
    <tr>
      
      <td>Start Sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
  </tbody>
</table>
            </Row>
            <Row>
                <Col>
                <table className="table table-hover table-dark">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Reset The Value</td>
      
      <td> <Button variant="secondary">Secondary</Button></td>
    </tr>
    <tr>
      
      <td>Stop The sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
    <tr>
      
      <td>Start Sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
  </tbody>
</table>
                </Col>
                <Col>
                <table className="table table-hover table-dark">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Reset The Value</td>
      
      <td> <Button variant="secondary">Secondary</Button></td>
    </tr>
    <tr>
      
      <td>Stop The sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
    <tr>
      
      <td>Start Sensor</td>
     
      <td> <Button variant="success">Success</Button></td>
    </tr>
  </tbody>
</table>
                </Col>
            </Row>
    
        </Container>

    );
}

export default CustomerPage;