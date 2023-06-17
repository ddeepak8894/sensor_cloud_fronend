import React, { useState } from 'react';
import './SignIn.css';
import { Button, Container, Form, Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
 const signInResponse = {
  status: "success",
  data: [
    {
      firstName: "Krushna",
      lastName: "yadav",
      cellNo: "8793031484",
      address: "vrindawan",
      bloodGroup: "O+",
      role:"admin"
    },
  ],
};
  const [username, setUsername] = useState('Enter your User name');
  const [password, setPassword] = useState('Enter your Password');

  const handleSignIn = () => {
    // Logic for handling sign-in

    console.log('Username:', username);
    console.log('Password:', password);
  };



  return (
    <Container className='signin-container '>
   
        <Form className="signin-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setUsername(e.target.value); console.log(e.target.value) }} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); console.log(e.target.value) }}/>
      </Form.Group>


      <Button onClick={()=>{
        navigate('/signIn',{state: {signInResponse}})
      }} variant="primary" type="submit">
        Sign in
      </Button>
      <Row ><Link>Forgot password</Link></Row>
      
    </Form>
        
        
   

     
        
   
    
     
   

  </Container>

  
  );
};

export default SignIn;
