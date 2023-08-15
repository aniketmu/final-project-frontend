import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ServerIcon, PlusIcon, CogIcon, ChevronDownIcon, MicrophoneIcon, PhoneIcon } from '@heroicons/react/solid';
import { setChannels, setDirect } from '../store/actions';
import { changeUserEmail, changeUserName, changeUserId } from '../store/actions';
import Cookies from 'js-cookie';
import Channel from './Channel';
import Chat from './Chat';
import chat from '../chat.png'



const DashBoard = () => {
  const [showDirect, setShowDirect] = useState(false)
  const [email, setEmail] = useState("");
  const [matchingEmails, setMatchingEmails] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false)

  const {user}  = useSelector((state) => ({
        user: state.user
      }));
  
  const dispatch = useDispatch();

  const {channels}  = useSelector((state) => ({
    channels: state.channels
  }));

  const { directs } = useSelector((state) => ({
    directs: state.directs 
  }));

  const handleMatchingEmailClick = (clickedEmail, e) => {
    e.preventDefault();
    setEmail(clickedEmail);
    setMatchingEmails([]);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newDebounceTimeout = setTimeout(async () => {
      try {
        const response = await fetch("https://backend-prelim.onrender.com/search-Users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({userEmail: email,})
        })
        if(response.status === 404){
          console.log("user not found")
        }else if(response.status === 200){
          const data = await response.json()
          setMatchingEmails(data.users)
        }
      } catch (error) {
        console.log(error)
      }
    }, 300); 
    setDebounceTimeout(newDebounceTimeout);
  };
  
  const navigate = useNavigate()
  
  const handleAddChannel = async () => {
    const channelName = prompt("Enter a new channel name");
    try {
      const response = await fetch("https://backend-prelim.onrender.com/add-channel", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: channelName, userId: user.id})
      })

      if(response.status === 500){
        console.log("Channel could not be create")
      }else if(response.status === 200){
        const data = await response.json();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = Cookies.get('userId');
    if (!token){
      navigate("/signin")
    }
  })
  
  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    const storedUserEmail = Cookies.get('userEmail');
    const storedUserName = Cookies.get('userName');
  
    dispatch(changeUserId(storedUserId));
    dispatch(changeUserEmail(storedUserEmail));
    dispatch(changeUserName(storedUserName));
  
  }, []);
  
  
  useEffect(() => {
    if (user.id) {
      (async () => {
        setLoading(true)
        const response = await fetch("https://backend-prelim.onrender.com/channel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId: user.id})
        })

        if(response.status === 404){
          setLoading(false)
          return;
        }else if(response.status === 200){
          const data = await response.json()
          dispatch(setChannels(data.channel))
          setLoading(false)
        }
      })();
    }}, [user.id]);


    const handleAddDiretcs = async () => {
      setShowDirect(true);
    };

    const handleSignOut = () => {
      Cookies.remove('token');
      Cookies.remove('userEmail');
      Cookies.remove('userName');
      Cookies.remove('userId');
  
      navigate('/signin'); 
    };

    
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-[#A4508B] p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img src={chat} alt="" className="h-5" />
          </div>
          <hr className=" border-gray-700 border w-8 mx-auto" />
          <div className="server-default hover:bg[#A5A4CB] group">
          </div>
        </div>

        <div className="bg-[#77EED8] flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
            Welcome {user.name?.split(' ')[0]}
          </h2>
          <button onClick={()=> navigate("/profile")}>Profile</button>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className="h-3  mr-2" />
              <h4 className="font-semibold ">Channels</h4>
              <PlusIcon
                className="h-6 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {channels?.map((channel)=> (
                <Channel 
                key={channel._id}
                id={channel._id}
                channelName={channel.name}/>
              ))}
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
            </div>
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1">
              <h4 className="text-white text-xs font-medium">
              </h4>
            </div>

            <div className="text-gray-400 flex items-center">
            <div
            className="hover:bg-[#3A3C43] p-2 rounded-md cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#B0B0B0] flex-grow">
          <Chat />
        </div>
      </div>
    </>
  )
}

export default DashBoard
