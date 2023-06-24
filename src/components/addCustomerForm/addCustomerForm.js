import axios from "axios";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { URL } from "../../config";
import { toast } from "react-toastify";


function AddCustomerForm(props) {

  // constants and variables
  const { setAddEmployee } = props;
  const [firstName, setFirstName] = useState('ramhari');
  const [lastName, setLastName] = useState('tiwari');
  const [email, setEmail] = useState('ramhari@gmail.com');
  const [password, setPassword] = useState('ramhari@123');
  const [role, setRole] = useState('');
  const [cellNo, setCellNo] = useState('1234578590');
  const [securityQuestion, setSecurityQuestion] = useState('name of pet?');
  const [securityAnswer, setSecurityAnswer] = useState('harry');



//  methods

const checkValidityOfEmail=()=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.match(emailRegex)) {
  
    return;
  }
}
const sendDataToServer=()=>{
    // Check if any field is empty
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      role.trim() === '' ||
      cellNo.trim() === '' ||
      securityAnswer.trim() === '' ||
      securityQuestion.trim() === ''
    ) {
      console.log('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      console.log('Please enter a valid email address');
      return;
    }
    const cellNoRegex = /^\d{10}$/;
    if (!cellNo.match(cellNoRegex)) {
      console.log('Please enter a valid 10-digit cell number');
      return;
    }
  const body={
    firstName,lastName,email,password,role,cellNo,securityAnswer,securityQuestion
  }
  axios.post(`${URL}/user/addUser`,body).then((res)=>{
    if(res.data.data=="USER_ADDED_SUCCESSFULLY"){
      console.log(res.data.data)
      toast.success("User Added success fully");
      
    }
  })

}


  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>First Name<span style={{color:"red"}} >*</span>{firstName.length > 4 ? <span></span>:<span style={{color:"red"}}>*Enter Valid Name </span> }</Form.Label>
        <Form.Control           
          type="text"
          placeholder="Enter First name"
          
          onChange={(e) => {
            
             setFirstName(e.target.value)
          }}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFirstname2">
        <Form.Label>Last Name<span style={{color:"red"}} >*</span></Form.Label>
        <Form.Control
        onChange={(e) => setLastName(e.target.value)}
        type="text" placeholder="Enter last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail3">
        <Form.Label>Enter Email<span style={{color:"red"}} >*</span> {email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? <span></span>:<span style={{color:"red"}} >Enter Valid Email</span>}</Form.Label>
        <Form.Control
        onChange={(e) => {
          checkValidityOfEmail()
          setEmail(e.target.value)
        }}
        type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword4">
        <Form.Label>Password<span style={{color:"red"}} >*</span></Form.Label>
        <Form.Control
        onChange={(e) => setPassword(e.target.value)}
        type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail5">
        <Form.Label>Mobile Number<span style={{color:"red"}} >*</span>{cellNo.match(/^\d{10}$/) ? <span></span>:<span style={{color:"red"}} >Enter Mobile number</span>}</Form.Label>
        <Form.Control 
        onChange={(e) => setCellNo(e.target.value)}
        type="text" placeholder="Mobile Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail6">
        <Form.Label>Select Role<span style={{color:"red"}} >*</span></Form.Label>
        <Form.Select onChange={(e) => setRole(e.target.value)} aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">Admin</option>
          <option value="2">Customer</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail11">
        <Form.Label>Enter Security Question<span style={{color:"red"}} >*</span> </Form.Label>
        <Form.Control 
        onChange={(e) => setSecurityQuestion(e.target.value)}
        type="text" placeholder="Enter Security Question" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail12">
        <Form.Label>Enter Security Answer<span style={{color:"red"}} >*</span> </Form.Label>
        <Form.Control 
        onChange={(e) => setSecurityAnswer(e.target.value)}
        type="text" placeholder="Enter Security Answer" />
      </Form.Group>

      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          {" "}
          <Button onClick={()=>{
            sendDataToServer()
           }} variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="p-2">
          <Button
            onClick={() => {
              
              setAddEmployee(false);
            }}
            variant="success"
          >
            Close
          </Button>
        </div>
      </Stack>
    </Form>
  );
}

export default AddCustomerForm;
