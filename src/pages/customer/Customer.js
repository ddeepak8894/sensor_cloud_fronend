import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  ProgressBar,
  Row,
  Stack,
  Table,
  Toast,
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
import MapComponent from "../../components/Map/MapComponent";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

function CustomerPage() {
  const navigate = useNavigate();
  const [addEmployee, setAddEmployee] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { userId } = location.state;
  const [sensorList, setSensorList] = useState([]);
  const [sensorId, setSensorId] = useState(1);
  const [sensorName, setSensorName] = useState("");
  const [zoomValue, setZoomValue] = useState(14);
  const [mapshowFlaf, setMapShowFlag] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [deletedSensorName, setDeletedSensorName] = useState("");
  const [pageRereshToggle, setPageRefreshToggle] = useState(true);
  const [showTankMap,setShowTankMap]=useState(false)
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
  // Filter the sensorList based on the searchQuery
  const filteredSensors = sensorList.filter((sensor) =>
    sensor.nameOfSensor.includes(searchQuery)
  );
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
      console.log(data.data)
  
      
      if(data.data.length > 0){
        setShowTankMap(true)
        setSensorList(data.data);
        setSensorId(data.data[0].sensorId);
        setSensorName(data.data[0].nameOfSensor.split("com-")[1]);
      }else{
        setShowTankMap(false)
      }
      
    });
  };

  const handleDeleteSensor = (sensorId, nameOfSensor) => {
    // Show a confirmation alert before deleting

    if (!nameOfSensor.includes(deletedSensorName) || sensorList.length ==1) {
      // User canceled the deletion, do nothing
      if(sensorList.length==1){
        toast.warning("can not delete all sensors", {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.warning("sensor not deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    // Make an API call to delete the sensor
    axios
      .post(`${URL}/sensor/deleteSensor`, {
        sensorId: sensorId,
        userId: userId,
        nameOfSensor: sensorName,
        // Assuming you have the user's ID stored somewhere
      })
      .then((response) => {
        // Handle the response from the server, e.g., show a success message
        console.log("Sensor deleted successfully:", response.data);
        if (response.data.data == "SENSOR_DELETED_SUCCESS") {
          toast.success("sensor deleted success", {
            position: toast.POSITION.TOP_CENTER,
          });
          setPageRefreshToggle(!pageRereshToggle);
        } else {
          toast.warning("sensor not deleted", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error deleting sensor:", error);
      });
  };
  useEffect(() => {

    console.log("userid in useeffect = " + userId);
    getUserDataFromServer(userId);
    getSensorListOfUser();
  }, [pageRereshToggle]);

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
             <Button onClick={handleSensorForm} variant="success">
             Add Sensor
           </Button>
              )}
              <Button
                onClick={() => {
                  navigate("/myTanks", { state: { userId: userId} });
                }}
                variant="warning"
              >
                Go To My Tanks
              </Button>
     
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
          <div className="sensorTable">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>
                    Name Of Sensor{" "}
                    <Form className="d-flex">
                      <Form.Control
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        placeholder="Search sensors..."
                        className="me-2"
                        aria-label="Search"
                      />
                    </Form>
                  </th>
                  <th>Delete Sensor</th>
                </tr>
              </thead>
              <tbody>
                {filteredSensors.map((e) => (
                  <tr key={e.sensorId}>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          setSensorId(e.sensorId);
                          setZoomValue(5);
                          setMapShowFlag(false);
                          setSensorName(e.nameOfSensor.split("com-")[1]);
                        }}
                        variant={
                          e.currentStatus === "off" ? "danger" : "success"
                        }
                      >
                        {e.nameOfSensor.split("com-")[1]}
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          setSensorId(e.sensorId);
                          setSensorName(e.nameOfSensor);
                          setModalShow(true);
                        }}
                      >
                        Delete sensor
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal
              show={modalShow}
              onHide={setModalShow}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>
                  Are You sure ..you want to delete type the name of sensor
                  below
                </h4>
                <Form className="d-flex">
                  <Form.Control
                    onChange={(e) => setDeletedSensorName(e.target.value)}
                    type="search"
                    placeholder="Search sensors..."
                    className="me-2"
                    aria-label="Search"
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={() => {
                    setModalShow(false);
                    handleDeleteSensor(sensorId, sensorName);
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setModalShow(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
        <Col >
          <Row>
            <div className="tank">
              {showTankMap ? <Tank sensorId={sensorId} sensorName={sensorName} />: <h1>Sensor is not added ... pls add it</h1> }
              ;
            </div>
          </Row>
          <Row>
            {" "}
            
              {addSensor && (<div  className="addSensorForm">
                <AddSensorForm pageRereshToggle={pageRereshToggle} setPageRefreshToggle={setPageRefreshToggle} setAddSensor={setAddSensor} userId={userId} /> </div>
              )}
           
          </Row>
          <Row>
            
          </Row>
        </Col>
        <Col >
        {showTankMap?   <MapComponent
            sensorId={sensorId}
            sensorName={sensorName}
            zoomValue={zoomValue}
          />:<h1>Sensor is not added ... pls add it </h1>}
        
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerPage;
