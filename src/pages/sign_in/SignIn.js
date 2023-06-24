import React, { useState } from 'react';
import './SignIn.css';
import { Button, Container, Form, Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {URL} from '../../config'
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('Enter your User name');
  const [password, setPassword] = useState('Enter your Password');
  const [userData,setUserData]=useState({});

 const authenticateUser=()=>{

  const body = {
    email,password
  }


  axios.post(`${URL}/user/authenticate`,body).then((res)=>{
    console.log(res)
    setUserData(res.data.data)
    if(res.data.data=="USER_DOES_NOT_EXIST"){
      console.log(res.data.data)
      navigate('/');
      toast.warning("Email or Password is Wrong Try again!!");
      
    }else{
      console.log("user id in sign in page "+res.data.data.userId)
      localStorage.setItem('userId', res.data.data.userId)
      navigate('/myPage');

    }
  })

 }



  return (
    <Container className='signin-container '>
   
        <Form className="signin-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value); console.log(e.target.value) }} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); console.log(e.target.value) }}/>
      </Form.Group>


      <Button onClick={()=>{
        authenticateUser()
      }} variant="primary" >
        Sign in
      </Button>
      <Row ><Link>Forgot password</Link></Row>
      
    </Form>
        
        
   

     
        
   
    
     
   

  </Container>

  
  );
};

export default SignIn;
