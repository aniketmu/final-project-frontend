import { HashtagIcon, SearchIcon,  } from "@heroicons/react/outline";
import Picker from '@emoji-mart/react'
import axios from 'axios';
import {
  BellIcon,
  ChatIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import { v4 as uuid } from 'uuid';
import Message from "./Message";
import io from "socket.io-client";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { setMessages } from "../store/actions";

function Chat() {
  const [text, setText] = useState({});
  const [msgLoading, setMsgLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const [localDirect, setLocalDirect] = useState([])
  const [direct, setDirect] = useState({})
  const [file, setFile] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [channelFile, setChannelFile] = useState("")
  const socket = io("https://backend-prelim.onrender.com");
  const dispatch = useDispatch();
  const messageContainerRef = useRef(null);

  const { user } = useSelector((state) => ({
    user: state.user,
  }));


  const { currentChannelName, currentChannelId } = useSelector((state) => ({
    currentChannelName: state.currChannel.name,
    currentChannelId: state.currChannel.id,
  }));

  const { messages } = useSelector((state) => ({
    messages: state.messages,
  }));

  const handleChange = (e) => {
    setText({
      sender: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      content: e.target.value,
    });
  };


  useEffect(() => {
 
    socket.emit("join", currentChannelId);

    return () => {
      socket.disconnect();
    };
  }, [currentChannelId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setMsgLoading(true);

    if(!channelFile && text.content === ""){
      return
    }else{
      if (channelFile) {
        const data = new FormData();
        data.append("name", channelFile.name);
        data.append("file", channelFile);
  
    
        try {
          const response = await axios.post(`https://backend-prelim.onrender.com/chat-message-file`, data);
          console.log("read here", response)
    
          const newMessage = {
            _id: uuid(),
            content: text.content,
            file: response.data.fileObj,
            timestamp: new Date().toISOString(), 
            sender: {
              id: user.id,
              name: user.name,
              email: user.email,
              profileImage: user.profileImage || ""
            },
          };
  
    
          socket.emit("chatMessage", {
            channelId: currentChannelId,
            message: newMessage,
          });
    
          setChannelFile(""); 
          setText({}); 
      
    
          return response.message;
        } catch (error) {
          console.log(error);
        }
  
      } else {
        const newMessage = {
          _id: uuid(),
          content: text.content,
          file: text.file,
          timestamp: new Date().toISOString(), 
          sender: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
    
        socket.emit("chatMessage", {
          channelId: currentChannelId,
          message: newMessage,
        });
        setText({});
        setChannelFile("")
        setMsgLoading(false);
      }
    }
  }

  socket.on("message", (data) => {
    const modifiedMessage = data.message.file?.id
      ? { ...data.message, file: { ...data.message.file, path: `https://backend-prelim.onrender.com/file/${data.message.file.id}` } }
      : data.message;
  
    if (!localMessages.some(message => message._id === modifiedMessage._id)) {
      dispatch(setMessages(prevMessages => [...prevMessages, modifiedMessage]));
      setLocalMessages(prevLocalMessages => [...prevLocalMessages, modifiedMessage]);
    }
    
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    setText({});
    setChannelFile("");
  });

  useEffect(() => {
    messageContainerRef.current?.scrollIntoView();
    setText({});
    setFile("")
  }, [localMessages])
  


  useEffect(() => {
    const fetchMessages = async () => {
      
        if(currentChannelId){
          try {
            const response = await fetch("https://backend-prelim.onrender.com/messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ channelId: currentChannelId }),
            });
    
            if (response.status === 401) {
              console.log("No messages Found");
            } else if (response.status === 200) {
              const data = await response.json();
              const messages = data.messages;
              console.log("neew", messages)
              const modifiedMessages = messages.map((message) => ({
                ...message,
                file: {
                  ...message.file,
                  path: `https://backend-prelim.onrender.com/file/${message.file.id}`
                }
              }));
              dispatch(setMessages(modifiedMessages)); // Update Redux store
              setLocalMessages(modifiedMessages); // Update local state for UI
              console.log("local", localMessages)
            }
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        }
      };
      

    fetchMessages();
  }, [currentChannelId]);


  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
      <div className="flex items-center space-x-1">
      <HashtagIcon className="h-6 text-[#72767d]" />
      <h4 className="text-white font-semibold">
        {currentChannelName}
      </h4>
    </div> 
  <div className="flex space-x-3">
    <BellIcon className="icon" />
    <ChatIcon className="icon" />
    <UsersIcon className="icon" />
    <InboxIcon className="icon" />
    <QuestionMarkCircleIcon className="icon" />
  </div>
</header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide" >
      {localMessages.map((message) => (
  <Message
    key={message._id}
    id={message._id}
    message={message.content}
    file={message.file} 
    name={message.sender.name}
    email={message.sender.email}
    photoURL={message.sender.profileImage || `https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png`}
  />
))}
<div ref={messageContainerRef}></div>
        <div  className="pb-16" />  {/* ref={chatRef} */} {/* */}
      </main>
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <form className="flex-grow">
        <input
            type="text"
            placeholder="Type Text"
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            value={text.content}
            onChange={(e) => handleChange(e)}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="mr-2 w-7"
          >
            😄
          </button>
          {showEmojiPicker && (
            <Picker
            onEmojiSelect={(emoji) => {
              setText((prevText) => ({
                ...prevText,
                content: (prevText.content || '') + emoji.native, // Check and initialize content if undefined
              }));
              setShowEmojiPicker(false);
            }}
            style={{ position: 'absolute', bottom: '45px', right: '10px', zIndex: 1 }}
          />
          )}
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
          <input
            type="file"
            onChange={(e) => setChannelFile(e.target.files[0])}
          />
        </form>
      </div>
    </div>
  );
}


export default Chat;