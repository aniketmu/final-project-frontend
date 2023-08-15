import React, { useState } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from 'react';
import { changeUserImage, changeUserEmail, changeUserName, changeUserId, setChannels } from '../store/actions';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));
  
  const { channels } = useSelector((state) => ({
    channels: state.channels
  }));
  
  const avatars = [
    "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png",
    "https://cdn.pixabay.com/photo/2014/04/02/10/54/person-304893_1280.png",
    "https://cdn.pixabay.com/photo/2014/03/25/16/24/female-296989_1280.png",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1692109293~exp=1692109893~hmac=146a451dde0ad36e151759367c000c7c36b5be5822188043b397f02793c56a08",
    "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=826",
    "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg?w=826",
    "https://img.freepik.com/premium-vector/businessman-profile-cartoon_18591-58481.jpg?w=826",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=826&t=st=1692109395~exp=1692109995~hmac=88aec881411c23c765f6cb05561ca295fe52876d35feb7a395d65b8b023fa2d9",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=826&t=st=1692109436~exp=1692110036~hmac=635ef58eacaac6fd5a6add7379aecc96e9eb5f850f932bf63cd2586f224df512",
  ];

  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    const storedUserEmail = Cookies.get('userEmail');
    const storedUserName = Cookies.get('userName');

    // Update Redux state using the retrieved data
    dispatch(changeUserId(storedUserId));
    dispatch(changeUserEmail(storedUserEmail));
    dispatch(changeUserName(storedUserName));

    console.log("init state 0", storedUserId, storedUserEmail, storedUserName);
  }, []);

  useEffect(() => {
    if (user.id) {
      (async () => {
        const response = await fetch("https://backend-prelim.onrender.com/channel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id })
        });

        if (response.status === 404) {
          return;
        } else if (response.status === 200) {
          const data = await response.json();
          dispatch(setChannels(data.channel));
        }
      })();
    }
  }, [user.id]);

  const handleAvatarSelect = async (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    try {
        const response = await fetch("https://backend-prelim.onrender.com/update-profile-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: user.id, photoUrl: selectedAvatar})
        })

        if(response.status === 404){
            alert("Some Error happened")
        }else if(response.status === 500){
            alert("Some error occurred")
        }else if(response.status === 401){
            console.log("Profile Picture changed")
            dispatch(changeUserImage(selectedAvatar))
        }
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#202225]">
      <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg w-full md:w-2/3 xl:w-1/2">
        <div className="border-b px-6 py-8">
          <div className="text-center my-6">
            <img className="h-48 w-48 rounded-full border-4 border-white mx-auto my-6" src={selectedAvatar || user.image} alt="" />
            <div>
              {avatars.map((avatarUrl) => (
                <button
                  key={avatarUrl}
                  onClick={() => handleAvatarSelect(avatarUrl)}
                  className={`w-12 h-12 rounded-full border-2 border-transparent ${
                    selectedAvatar === avatarUrl ? 'border-blue-500' : ''
                  }`}
                  style={{ backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>
            <div className="py-4">
              <h3 className="font-bold text-4xl mb-2">{user.name}</h3>
              <div className="inline-flex text-gray-700 items-center">
                <span className="ml-2">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg w-full md:w-2/3 xl:w-1/2">
        <div className="border-b px-6 py-6">
          <h3 className="font-bold text-2xl mb-6">Channels</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              {channels?.map((channel) => (
                <h4 className="font-semibold text-xl" key={channel._id}>
                  {channel.name}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;





// const handlePictureUpload = async () => {
//     if (imageFile) {
//       const imageURL = URL.createObjectURL(imageFile);
//       try {
//         const response = await fetch("https://backend-prelim.onrender.com/update-profile-image", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({userId: user.id, photoUrl: imageURL})
//         })

//         if(response.status === 404){
//             alert("Some Error happened")
//         }else if(response.status === 500){
//             alert("Some error occurred")
//         }else if(response.status === 401){
//             console.log("Profile Picture changed")
//             dispatch(setImageFile(imageURL))
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   };