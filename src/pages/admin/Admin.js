import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../admin/Admin.css";
import axios from "axios";
import { URL } from "../../config";

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [users,setUsers]=useState([])

  const getListOfUser = () => {
    axios.get(`${URL}/user/getAllUsers`).then((res) => {
      const data = res.data;
      setUsers(data.data)
      console.log(data.data)
     });
  };

  useEffect(()=>{
    getListOfUser()
  },[])

  return (
    <Container fluid>
      <Navbar bg="dark" expand="sm" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand >Additional Functions</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
                <Stack direction="horizontal" gap={2}>
                    <Button variant="outline-success">Signed in as: <a href="#login">Krushna</a></Button>
                    <Button variant="success">Add New Customer</Button>

                </Stack>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
              <Button
                onClick={() => {
                  navigate("/logout");
                }}
                variant="primary"
              >
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>User Id</th>
          <th>Full Name</th>
          <th>Name Of Society</th>
          <th>No Of Sensors</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.numberOfSensors}</td>
          </tr>
        ))}
      
  
      </tbody>
      </Table>
    </Container>
  );
}

export default AdminPage;
