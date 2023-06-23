import { Badge, Button, Card, Col, Container, Form, Nav, NavDropdown, Navbar, ProgressBar, Row, Stack } from "react-bootstrap";
import TestChart from "../../components/TestChart";
import VolumeChart from "../../components/VolumeChart";
import { useState } from "react";
import {URL} from "../../config.js"
import "../customer/Customer.css"
import Tank from "../../components/Tank";

function CustomerPage() {

    const [addEmployee,setAddEmployee] =useState(false)
    const [isAdmin,setIsAdmin] = useState(true)
    const handleDataForm = ()=>{
        setAddEmployee(!addEmployee)
    }
    const [addSensor,setAddSensor] =useState(false)
    const handleSensorForm = ()=>{
        setAddSensor(!addSensor)
    }
    const fetchData = async () => {
        try {
          const response = await fetch('http://3.111.108.14:4000/api/sensorDataStore/getSensorDetails');
          const { data } = await response.json();
            
        } catch (error) {
          console.error('Error fetching data from API:', error);
        }
      };

    const handleClearData = async () => {
        try {
            const response=await fetch('http://3.111.108.14:4000/api/sensorDataStore/deleteAll', { method: 'GET' });
          console.log(response)
        } catch (error) {
          console.error('Error clearing data:', error);
        }
      };

    return (

      <Container fluid>
        <Navbar bg="dark"  expand="sm" className="bg-body-tertiary">
        <Container fluid >
          <Navbar.Brand href="#">Additional Functions</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
            >
              <Navbar.Text>
                 Signed in as: <a href="#login">K Yadav</a>
            </Navbar.Text>
            {isAdmin &&  <NavDropdown title="Customer" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3"></NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                <Button onClick={handleDataForm} variant="success">Add Customer</Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                <Button variant="success">Remove Customer</Button>
                </NavDropdown.Item>
              </NavDropdown>}
   
             {isAdmin&& <NavDropdown title="Sesnor" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3"><Button onClick={handleSensorForm} variant="success">Add Sensor</Button></NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  <Button variant="success">Add Sensor</Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>}

            </Nav>
 
   
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col><VolumeChart></VolumeChart></Col>
        <Col >       
        <Tank></Tank>
        
        </Col>
  
      </Row>
      <Row>
   

{addEmployee && 
<Col style={{backgroundColor:"white",borderRadius:10,margin:10}}>
<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First name" />
      </Form.Group>

 

      <Form.Group className="mb-3" controlId="formBasicFirstname2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail5">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" placeholder="Mobile Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail6">
        <Form.Label>Select Role</Form.Label>
        <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">Admin</option>
      <option value="2">Customer</option>
      
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail11">
        <Form.Label>Enter Security Question </Form.Label>
        <Form.Control type="text" placeholder="Enter Security Question" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail12">
        <Form.Label>Enter Security Answer </Form.Label>
        <Form.Control type="text" placeholder="Enter Security Answer" />
      </Form.Group>

      <Stack direction="horizontal" gap={3}>
      <div className="p-2">    <Button variant="primary" type="submit">
        Submit
      </Button></div>
      <div className="p-2"><Button onClick={()=>{setAddEmployee(false)}} variant="success">Close</Button></div>
      
    </Stack>
  
      
    </Form>
    </Col>}
    {addSensor && 
<Col style={{backgroundColor:"white",borderRadius:10,margin:10}}>
<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name Of Sensor</Form.Label>
        <Form.Control type="text" placeholder="Enter Name Of Sensor" />
      </Form.Group>

 

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Current Status</Form.Label>
        <Form.Control type="text" placeholder="Enter Current Statu" />
      </Form.Group>
     <Stack direction="horizontal" gap={3}>
      <div className="p-2">    <Button variant="primary" type="submit">
        Submit
      </Button></div>
      <div className="p-2"><Button onClick={()=>{setAddSensor(false)}} variant="success">Close</Button></div>
      
    </Stack>
  
      
    </Form>
    </Col>}


      </Row>
      <Row>
       
        <Col style={{backgroundColor:"white",borderRadius:10}}><table style={{borderRadius:20}} className="table table-hover">
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
</table></Col>      <Col className="boxClass" style={{backgroundColor:"white",borderRadius:10,margin:10}}>
        <table  className="table table-hover ">
  <thead>
    <tr>
      <th scope="col">Name</th>
     <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Reset The Chart</td>
     <td> <Button onClick={handleClearData} variant="danger">Click to reset</Button></td>
    </tr>
    <tr>
       <td>Start The sensor</td>
       <td> <Button variant="success">click to start..</Button><Badge pill bg="warning" text="dark">
        Warning
      </Badge></td>
    </tr>
    <tr>
      <td>Stop Sensor</td>
      <td> <Button variant="danger">Click to Stop</Button></td>
    </tr>
  </tbody>
</table></Col>
       
      <Stack gap={3}>
      <div className="p-2">First item</div>
      <div className="p-2">Second item</div>
      <div className="p-2">Third item</div>
    </Stack>
      </Row>
      </Container>


    );
}

export default CustomerPage;