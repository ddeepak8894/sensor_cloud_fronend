import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  ProgressBar,
  Row,
  Stack,
} from "react-bootstrap";
import TestChart from "../../components/TestChart";
import VolumeChart from "../../components/VolumeChart";
import { useEffect, useState } from "react";
import { URL } from "../../config.js";
import "../customer/Customer.css";
import Tank from "../../components/Tank";
import AddEmployeeForm from "../../components/addCustomerForm/addCustomerForm";
import AddCustomerForm from "../../components/addCustomerForm/addCustomerForm";
import { ToastContainer, toast } from "react-toastify";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import AddSensorForm from "../../components/addSensorForm/addSensorForm";

function CustomerPage() {
  const navigate = useNavigate();
  const [addEmployee, setAddEmployee] = useState(false);

  const [isAdmin, setIsAdmin] = useState(true);
  const [userData, setUserData] = useState({});

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { userId } = location.state;
  const [sensorList, setSensorList] = useState([]);
  const [sensorId,setSensorId]=useState(1)
  const [sensorName,setSensorName]=useState("")
  const handleDataForm = () => {
    setAddEmployee(!addEmployee);
  };
  const [addSensor, setAddSensor] = useState(false);
  const handleSensorForm = () => {
    setAddSensor(!addSensor);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://3.111.108.14:4000/api/sensorDataStore/getSensorDetails"
      );
      const { data } = await response.json();
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const handleClearData = async () => {
    try {
      const response = await fetch(
        "http://3.111.108.14:4000/api/sensorDataStore/deleteAll",
        { method: "GET" }
      );
      console.log(response);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };
  const getUserDataFromServer = (userId) => {
    console.log("user id in get user data from server " + userId);
    const body = {
      userId,
    };
    console.log("user in body " + userId);
    axios.post(`${URL}/user/getUser`, body).then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
      if (res.data.data.role == "admin") {
        setIsAdmin(true);
      }
      if (res.data.data == "USER_DOES_NOT_EXIST") {
        navigate("/");
        toast.warning("please login again");
      } else {
      }
    });
  };
  const getSensorListOfUser = () => {
    axios.get(`${URL}/sensor/getSensorsOfUser/${userId}`).then((res) => {
      const data = res.data;
      setSensorList(data.data);
    });
  };

  useEffect(() => {
    console.log("userid in useeffect = " + userId);
    getUserDataFromServer(userId);
    getSensorListOfUser();
  }, [addSensor]);

  return (
    <Container fluid>
      <Navbar bg="dark" expand="sm" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Additional Functions</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Navbar.Text>
                Signed in as: <a href="#login">{userData.firstName}</a>
              </Navbar.Text>
              {isAdmin && (
                <NavDropdown title="Customer" id="navbarScrollingDropdown">
                  <NavDropdown.Item></NavDropdown.Item>
                  <NavDropdown.Item>
                    <Button onClick={handleDataForm} variant="success">
                      Add Customer
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button variant="success">Remove Customer</Button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {isAdmin && (
                <NavDropdown title="Sesnor" id="navbarScrollingDropdown">
                  <NavDropdown.Item>
                    <Button onClick={handleSensorForm} variant="success">
                      Add Sensor
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Button variant="success">Add Sensor</Button>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              )}
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
      <Row>
        <Col md="auto">
          <div className="sidebarSensorList">
             ̰
            <Stack gap={3}>
              
              
              {sensorList.map((e) => {
              return<Button onClick={()=>{
                setSensorId(e.sensorId) 
  
                setSensorName(e.nameOfSensor.split("com-")[1])
              }} variant="warning">{e.nameOfSensor.split("com-")[1]}</Button>;
            })}
            </Stack>
            
          </div>
        </Col>
        <Col>
          <div className="tank">
             <Tank sensorId={sensorId} sensorName={sensorName} />;
          
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerPage;
