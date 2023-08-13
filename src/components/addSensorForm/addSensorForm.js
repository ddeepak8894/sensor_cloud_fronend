import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { URL } from "../../config";

function AddSensorForm(props) {
const {setAddSensor,userId,setPageRefreshToggle,pageRereshToggle} = props

const [nameOfSensor,setNameOfSensor]=useState("")
const [currentStatus,setCurrentStatus]=useState("off")

const sendDataToServer=()=>{

const body={
    userId,nameOfSensor,currentStatus
}
if(nameOfSensor.length>4){
  axios.post(`${URL}/sensor/addSensor`,body).then((res)=>{
    if(res.data.data=="SENSOR_ADDED_SUCCESS"){
      console.log(res.data.data)
      setPageRefreshToggle(!pageRereshToggle)
      setAddSensor(false)
      toast.success("SENSOR Added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      
    }
  })
}else{
  toast.warning("name too short enter valid name", {
    position: toast.POSITION.TOP_CENTER,
  })
}
  
}

    return ( 
    
        <Form > 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            
            <Form.Label>Name Of Sensor</Form.Label>
            {nameOfSensor.length>4?<div></div>:<h5 style={{color:"red"}}>*Enter Valid Name</h5>}
            <Form.Control onChange={(e)=>{
                setNameOfSensor(e.target.value)
            }}   type="text" placeholder="Enter Name Of Sensor" />
          </Form.Group>


          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
             
              <Button onClick={()=>{

                sendDataToServer()
                
              }} variant="primary" >
                Submit
              </Button>
            </div>
            <div className="p-2">
              <Button
                onClick={() => {
                    
                  setAddSensor(false);
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

export default AddSensorForm;