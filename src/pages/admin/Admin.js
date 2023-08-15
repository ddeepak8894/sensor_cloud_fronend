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
import UpdateCustomerModal from "../../components/updateCustomerForm/UpdateCustomerModal";

function AdminPage() {
  const navigate = useNavigate();
  const [updatePage, setUpdatePage] = useState(false);
  const [users, setUsers] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [showUpdateCusotmerModal,setShowUpdateCusotmerModal]=useState(false)
  const handleUpdateCusotmerModalClose = ()=>setShowUpdateCusotmerModal(false)
  const handleUpdateCusotmerModalShow = ()=>setShowUpdateCusotmerModal(true)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateCustomerModalUser,setUpdateCustomerModalUser]=useState({
    "userId": 1,
    "firstName": "krushna1",
    "lastName": "yadav1",
    "email": "madhura1@gmail.com",
    "password": "1234",
    "role": "admin",
    "cellNo": "12341",
    "securityQuestion": "yes",
    "securityAnswer": "i love you",
    "fullName": "krushna1 yadav1",
    "numberOfSensors": 2,
    "nameOfSociety": ""
})
const filteredUsers = users.filter(user => 
  user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.nameOfSociety.toLowerCase().includes(searchTerm.toLowerCase())
);
const triggerUpdatePage=()=>{setUpdatePage(!updatePage)}
const triggerUpdateModalFlag=()=>{setUpdateCustomerModalFlag(!updateCustomerModalFlag)}

  const [addCustomerModalFormFlag, setAddCustomerModalFormFlag] =
    useState(false);
  const [updateCustomerModalFlag,setUpdateCustomerModalFlag] = useState(false)

  const getListOfUser = () => {
    axios.get(`${URL}/user/getAllUsers`)
      .then((res) => {
        const data = res.data;
        setUsers(data.data);
      })
      .catch((error) => {
        navigate("/error")
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    getListOfUser();
  }, [updatePage]);

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
                  Signed in as: <a href="">Krushna</a>
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    handleShow();
                    
                  }}
                >
                  Add New Customer
                </Button>
              
              </Stack>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                      type="search"
                      placeholder="Search by name or society..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="me-2"
                      aria-label="Search"
              />
              <Button variant="outline-success"
              
              >Search</Button>
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
      {
        updateCustomerModalFlag && 
        <UpdateCustomerModal triggerUpdateModalFlag={triggerUpdateModalFlag} triggerUpdatePage={triggerUpdatePage} user={updateCustomerModalUser} show={showUpdateCusotmerModal} handleClose={handleUpdateCusotmerModalClose} handleShow={handleUpdateCusotmerModalShow}/>

     
      }
      
        <AddCustomerForm
          setShow={setShow}
          handleClose={handleClose}
          onClick={handleShow}
          show={show}
          handleShow={handleShow}
          setAddEmployee={setAddEmployee}
          setAddCustomerModalFormFlag={setAddCustomerModalFormFlag}
        />

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Full Name</th>
            <th>Name Of Society</th>
            <th>No Of Sensors</th>
            <th>Email</th>
            <th>Password</th>
            <th>cellNo</th>
            <th>Role</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.nameOfSociety}</td>
              <td>{user.numberOfSensors}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.cellNo}</td>
              <td>{user.role}</td>
              
              <td>
                
                <Button bsPrefix="super-btn" onClick={()=>{
                  setUpdateCustomerModalFlag(true)
                  setUpdateCustomerModalUser(user)
                  handleUpdateCusotmerModalShow()
                  
                  }} variant="success">
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
