export const USER_CHANGE = 'USER_CHANGE';
export const SET_CHANNEL = 'SET_CHANNEL'
export const SET_CURRCHANNEL = 'SET_CURRCHANNEL'
export const SET_MESSAGES = "SET_MESSAGES"
export const SET_DIRECT = "SET_DIRECT";
export const SET_CURRDIRECT = 'SET_CURRDIRECT'

// action creators
export const changeUserName = (newName) => ({
    type: USER_CHANGE,
    payload: { field: "name", value: newName },
  });
  
export const changeUserEmail = (newEmail) => ({
    type: USER_CHANGE,
    payload: { field: "email", value: newEmail },
  });

export const changeUserId = (userId) => ({
    type: USER_CHANGE,
    payload: { field: "id", value: userId },
  });

export const changeUserImage = (img) => ({
    type: USER_CHANGE,
    payload: { field: "profileImage", value: img },
  });

  export const setChannels = (channels) => ({
    type: SET_CHANNEL, // Corrected action type
    payload: channels,
  });

  export const setCurrChannel = (channel) => ({
    type: SET_CURRCHANNEL, // Corrected action type
    payload: channel,
  });

  export const setMessages = (messages) => ({
    type: SET_MESSAGES, // Corrected action type
    payload: messages,
  });

  export const setDirect = (directs) => ({
    type: SET_DIRECT,
    payload: directs
  })

  export const setCurrDirect = (direct)=>({
    type: SET_CURRDIRECT,
    payload: direct, 
  })
  