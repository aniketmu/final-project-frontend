import { useState } from "react";
import { HashtagIcon, PlusIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { setCurrChannel, setCurrDirect } from "../store/actions";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState("");
  const [matchingEmails, setMatchingEmails] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const addMembers = () => {
    setShowInviteForm(true);
  };

  const handleMatchingEmailClick = (clickedEmail) => {
    setEmail(clickedEmail);
    setMatchingEmails([]);
  };

  const handleEmailChange = (e) => {
    console.log("handleEmailChange called");
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newDebounceTimeout = setTimeout(async () => {
      console.log(email)
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
          console.log(data)
          setMatchingEmails(data.users)
        }
      } catch (error) {
        console.log(error)
      }
    }, 300); // Debounce time in milliseconds
    setDebounceTimeout(newDebounceTimeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === ""){
      return
    }else{
      try {
        const response = await fetch("https://backend-prelim.onrender.com/invite-to-channel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({channelId: id, email: email,})
          })
  
          const data = response.json();
          console.log(data)
          setEmail("");
          setMatchingEmails([]);
          setShowInviteForm(false);
      } catch (error) {
        console.log(error)
      }
      setEmail("");
      setMatchingEmails([]);
      setShowInviteForm(false);
    }
  };

  const setChannel = () => {
    dispatch(
      setCurrChannel({
        id: id,
        name: channelName,
      })
    );
    dispatch(setCurrDirect({}))
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
          onClick={setChannel}
        >
          <HashtagIcon className="h-5 mr-2" /> {channelName}
        </div>
        <div>
          <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white" onClick={addMembers} />
        </div>
      </div>

      {showInviteForm && (
        <form className="mt-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            className="border rounded-md p-1 mr-2"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            Invite
          </button>
          {matchingEmails.length > 0 && (
            <div className="mt-2">
              Matching emails:
              <ul>
                {matchingEmails.map((matchingEmail) => (
                  <li
                    key={matchingEmail.email}
                    onClick={() => handleMatchingEmailClick(matchingEmail.email)}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {matchingEmail.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      )}
    </>
  );
}

export default Channel;