import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
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
import AddCustomerForm from "../../components/addCustomerForm/addCustomerForm";
import { toast } from "react-toastify";

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [users, setUsers] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [addCustomerModalFormFlag, setAddCustomerModalFormFlag] =
    useState(false);

  const getListOfUser = () => {
    axios.get(`${URL}/user/getAllUsers`).then((res) => {
      const data = res.data;
      setUsers(data.data);
      console.log(data.data);
    });
  };

  useEffect(() => {
    getListOfUser();
  }, []);

  return (
    <Container fluid>
      <Navbar bg="dark" expand="sm" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>Additional Functions</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Stack direction="horizontal" gap={2}>
                <Button variant="outline-success">
                  Signed in as: <a href="#login">Krushna</a>
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    handleShow();
                    setAddCustomerModalFormFlag(true);
                  }}
                >
                  Add New Customer
                </Button>
              
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
              <Button onClick={()=>{
                toast.success("hare krushna")
              }}>
toast test
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {addCustomerModalFormFlag && (
        <AddCustomerForm
          setShow={setShow}
          handleClose={handleClose}
          onClick={handleShow}
          show={show}
          setAddEmployee={setAddEmployee}
          setAddCustomerModalFormFlag={setAddCustomerModalFormFlag}
        />
      )}

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Full Name</th>
            <th>Name Of Society</th>
            <th>No Of Sensors</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.nameOfSociety}</td>
              <td>{user.numberOfSensors}</td>
              <td>{user.email}</td>
              <td>{user.cellNo}</td>
              <td>{user.role}</td>
              
              <td>
                <Button bsPrefix="super-btn" variant="success">
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPage;
