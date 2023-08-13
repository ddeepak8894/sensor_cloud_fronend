import { Button, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

function DeleteModal(props) {
   const  {handleDeleteSensor,setDeletedSensorName,setModalShow,modalShow} = props
    return (
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
           <h4>Are You sure ..you want to delete type the name of sensor below</h4>
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
           <Button onClick={()=>{
               setModalShow(false)
               handleDeleteSensor()
           }}>Close</Button>
         </Modal.Footer>
       </Modal>
      );
}

export default DeleteModal;