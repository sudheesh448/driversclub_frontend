function sendWebSocketMessage(roomName, messageContent) {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/notification/${roomName}/`);
  
    socket.onopen = () => {
      console.log("WebSocket connection opened sender");
      const messageToSend = {
        message_content: messageContent,
        reciever: roomName,
      };
      socket.send(JSON.stringify(messageToSend));
    //   socket.close();
      console.log("room name rrrr",roomName);
    };
  }

  
export default sendWebSocketMessage;