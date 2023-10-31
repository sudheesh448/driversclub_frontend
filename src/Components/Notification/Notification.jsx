import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import AxiosInstance from "../../Components/CustomAxios/axiosInstance";
import { BASE_IMAGE_URL } from "../Common/BaseUrl";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Icons from "../Driver/Driver_Home/DriverComponents/Icons";
import { useSelector } from 'react-redux';
import { selectUserData } from './../../Components/Redux/authSlice';
import ChatList from "./ChatList";
import { ArrowBackIosNew, ArrowDownward, ArrowOutward, ArrowRight, ArrowUpward } from "@mui/icons-material";
import IconsMenu from "../User/HOME/Components/IconsMenu";
import Skeleton from 'react-loading-skeleton';





const Notification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get("user_id");
  const driver_id = searchParams.get("driver_id");
  const [messages, setMessages] = useState([]);
  const [userId, setUser] = useState(user_id);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [websocketMessages, setWebsocketMessages] = useState([]);
  const axiosinstance= AxiosInstance()
  const userData = useSelector(selectUserData);
  const userIdred = userData.userId;
  const isDriver = userData.is_driver;
  const [recieverName,setRecieverName]=useState("")
  const messageContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };
  let id_forname=""


  useEffect(() => {
    const roomName = `${userIdred}`;
    console.log("room name----", roomName);
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notification/${roomName}/`);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);


  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };
      socket.onmessage = (event) => {
        console.log("messaage recived");
        console.log("recieved",event.data)
        const data = JSON.parse(event.data);
        const message_get = data.message_content;
        setWebsocketMessages((prevMessages) => [...prevMessages, data]);
      };
    }

    const sendMessage = () => {
      const messageToSend = {
        message_content: messageInput,
      };
      socket.send(JSON.stringify(messageToSend));
    };
    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMessage();
    }
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `${BASE_IMAGE_URL}/chat/${user_id}/${driver_id}`, // Adjust the URL structure as needed
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
            console.log("chat data",response.data)
          setMessages(response.data);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user_id, driver_id]);

  useEffect(() => {
    if (isDriver){
        id_forname=user_id
    }else{
        id_forname=driver_id
    }
    console.log("id for name",id_forname)
    const fetchName = async () => {
      try {
        const response = await axiosinstance.get(
            `/name/${id_forname}/`, // Adjust the URL structure as needed
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
            console.log("chat name",response.data)
            setRecieverName(response.data);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchName();
  }, [user_id, driver_id]);
  


  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;
    try {

        let sender = userId;
        let receiver = driver_id;

        if (userId == userIdred) {
            sender = userId;
            receiver = driver_id;
          }
      
          if (driver_id == userIdred) {
            sender = driver_id;
            receiver = userId;
          }
          
          const newMessage = {
            sender: sender,
            receiver: receiver,
            message_content: messageInput,
          };
      const response = await axiosinstance.post(`/chat/create/`, newMessage, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        if (socket) {
          socket.send(JSON.stringify(newMessage));
        }
        setMessageInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

 
  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, ...websocketMessages]);
  }, [websocketMessages]);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
}, [messages]);

console.log("lastmessage:::",messages)
console.log("chat::::",userId,driver_id)

  return (
    <>
    <Navbar/>
    <div className="flex w-full">
        <div className="w-1/3 mt-16 f ">
            <div className=" ml-2  rounded-2xl bg-gray-100  " >
                {isDriver ? (<Icons/>):(<IconsMenu/>)}
            
            </div>
            <div className=" ml-2 rounded-3xl  bg-gray-300 pb-2 border-2 border-sky-800  mt-2 " >
            <div className="  ">
                <h1 className=" rounded-2xl bg-sky-800 py-4 px-2 font-semibold text-white text-lg">Your Chats</h1>
                <ChatList/>
            </div>

            </div>
        </div>
        <div className="w-2/3 ">
        {recieverName.user_name ? (
        <div className="mt-10 flex h-screen antialiased text-gray-800">
        
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div  className="  flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
                <div className="p-2 bg-sky-800 rounded-3xl flex">
                    <div className="w-1/3">
                <h1 className="px-2 font-semibold text-white text-lg">Messages</h1>
                </div>
                <div className="w-2/3">
                </div>
                <div className="w-1/3 justify-center text-center bg-white rounded-full">
                <h1 className="px-2 font-semibold text-sky-800 text-lg">{recieverName.user_name || <Skeleton width={150} />}</h1>
                </div>
                </div>
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div  className="flex-grow overflow-y-auto px-4 py-8" ref={messageContainerRef}>
                  {messages.length === 0 ? (
    <p>No messages available.</p>
  ) : (
                    messages.map((message, index) => (
                        
                  <div
                    key={index}
                    className={
                      message.sender != userIdred
                        ? "col-start-1 col-end-8 p-3 rounded-lg"
                        : "col-start-6 col-end-13 p-3 rounded-lg"
                    }
                  >
                    <div
                      key={index}
                      className={
                        message.sender != userIdred
                          ? "flex flex-row"
                          : "flex items-center justify-start flex-row-reverse"
                      }
                    >
                      <div className={
                        message.sender != userIdred
                          ? "flex items-center justify-center h-10 w-10 rounded-full bg-fuchsia-500 flex-shrink-0"
                          : "flex items-center justify-center h-10 w-10 rounded-full bg-yellow-500 flex-shrink-0"
                      } >
                        {message.sender != userIdred ? (<ArrowDownward/>):(<ArrowUpward/>)}
                        
                        
                      </div>
                      <div 
                        className={`relative mr-3 text-sm py-2 px-4  shadow rounded-xl `}
                      >
                        <div> {message.message_content || <Skeleton width={100} />}</div>
                        <div className="absolute text-xs bottom-0 left-0 -mb-8 mr-2 text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                     
                    ))
                )}
  
                  </div>
  
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       ) : (
        
        <div className="skeleton-loading">
          <Skeleton width={1000} height={400} />
        </div>
      )}
        </div>
    </div>
      
      <Footer/>
    </>
  );
};

export default Notification;