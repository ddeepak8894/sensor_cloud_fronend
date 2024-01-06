import React, { useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

const WebSocketImageComponent = (props) => {
  const [socket, setSocket] = useState(null);
  const [latestImage, setLatestImage] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const { nameOfSensor } = props;

  const connectWebSocket = () => {
    const newSocket = new WebSocket(`ws://3.111.108.14:80/ws/react_server?unique-identity=${nameOfSensor}`);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const receivedData = event.data;
      setShowComponent(true)
      setLatestImage(receivedData);
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null); // Clear socket on close
    };
  };



  const handleReconnect = () => {
    socket.close();
    setShowComponent(false)
    connectWebSocket();
    console.log("reconnected")
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [nameOfSensor,showComponent]); // Reconnect if nameOfSensor changes

  return (
    <div>
      <h1>Latest Received Image</h1>
      <div>

      </div>
  
      {showComponent ? (
        <div>
          <h3>{nameOfSensor}</h3>    <Stack direction='horizontal' gap={'3'} style={{borderStyle:'dotted'}}>
      <Button variant='success' onClick={handleReconnect}>Reconnect</Button>
     
      </Stack>
          <img
            src={URL.createObjectURL(latestImage)} // Assuming latestImage is Blob data
            alt="Latest Image"
            style={{
              borderStyle: 'solid',
              borderWidth: '8px',
              borderRadius: '10px',
              minHeight: '5cm',
              minWidth: '5cm',
              // Optional: Adjust maximum width as needed
            }}
          />
          <hr className="my-4" />
        </div>
      ) : (
        <h1 style={{ color: 'red' }}>Camera at source is off</h1>
      )}



    </div>
  );
};

export default WebSocketImageComponent;
