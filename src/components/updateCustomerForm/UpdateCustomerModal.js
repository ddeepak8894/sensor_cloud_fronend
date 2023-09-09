import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { URL } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";

function UpdateCustomerModal(props) {
  const { show, handleShow,triggerUpdateModalFlag, triggerUpdatePage,handleClose, user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [userId, setUserId] = useState(user.userId);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [cellNo, setCellNo] = useState(user.cellNo);
  const [securityQuestion, setSecurityQuestion] = useState(
    user.securityQuestion
  );
  const [securityAnswer, setSecurityAnswer] = useState(user.securityAnswer);
  const [nameOfSociety, setNameOfSociety] = useState(user.nameOfSociety);
  const checkValidityOfEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailRegex)) {
      return;
    }
  };
  const sendDataToServer = () => {
    console.log("999999999999999999999999")
  
    const body = {
      userId,
      firstName,
      lastName,
      email,
      password,
      role,
      cellNo,
      securityAnswer,
      securityQuestion,
      nameOfSociety,
    };
    console.log(body)
    axios.post(`${URL}/user/updateUser`, body).then((res) => {
      console.log("9999999999999999999inside99999")
console.log(res.data)
      if (res.data.data == "USER_UPDATE_SUCCESS") {
        console.log(res.data.data);
        toast.success("User Updated success fully", {
          position: toast.POSITION.TOP_CENTER,
        });
        triggerUpdatePage()
        triggerUpdateModalFlag()
        handleClose();
      } else {
        if (res.data.data == "USER_ADD_FAIL_DUPLICATE_EMAIL") {
          toast.warning("Duplicate Email", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    });
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>My Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>{user.userId}</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasi1cEmail1">
            <Form.Label>
              First Name<span style={{ color: "red" }}>*</span>
              {firstName.length > 4 ? (
                <span></span>
              ) : (
                <span style={{ color: "red" }}>*Enter Valid Name </span>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          

          <Form.Group className="mb-3" controlId="formBasic1Firstname2">
            <Form.Label>
              Last Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
              placeholder="Enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasi2cFirstname2">
            <Form.Label>
              Name Of Society<span style={{ color: "red" }}>*</span>
            </Form.Label>
           
            <Form.Control
              onChange={(e) => setNameOfSociety(e.target.value)}
              type="text"
              value={nameOfSociety}
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBa3sicEmail3">
            <Form.Label>
              Enter Email<span style={{ color: "red" }}>*</span>{" "}
              {email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? (
                <span></span>
              ) : (
                <span style={{ color: "red" }}>Enter Valid Email</span>
              )}
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                checkValidityOfEmail();
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Enter email"
              disabled
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your password"
              value={password}
              disabled
            />
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              {" "}
              <Button
                onClick={() => {
                  console.log("999999999999999999999999")
                  sendDataToServer();
                }}
                variant="primary"
              >
                Submit
              </Button>
            </div>
            <div className="p-2">
              <Button
                onClick={() => {
                  
                  handleClose();
                }}
                variant="success"
              >
                Close
              </Button>
            </div>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateCustomerModal;
