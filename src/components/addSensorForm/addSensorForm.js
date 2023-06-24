import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { URL } from "../../config";

function AddSensorForm(props) {
const {setAddSensor,userId} = props

const [nameOfSensor,setNameOfSensor]=useState("")
const [currentStatus,setCurrentStatus]=useState("off")

const sendDataToServer=()=>{

const body={
    userId,nameOfSensor,currentStatus
}
    axios.post(`${URL}/sensor/addSensor`,body).then((res)=>{
        if(res.data.data=="SENSOR_ADDED_SUCCESS"){
          console.log(res.data.data)
          toast.success("SENSOR Added successfully");
          
        }
      })
}

    return ( 
    
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name Of Sensor</Form.Label>
            <Form.Control type="text" placeholder="Enter Name Of Sensor" />
          </Form.Group>


          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
             
              <Button onClick={()=>{

                sendDataToServer()
                setAddSensor(false)
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