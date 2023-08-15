import { USER_CHANGE, SET_CHANNEL, SET_CURRCHANNEL, SET_MESSAGES, SET_DIRECT, SET_CURRDIRECT } from "./actions";

const initState = {
  user: {
    id: "",
    name: "",
    email: "",
    profileImage: "",
  },
  messages: [],
  channels: [],

  currChannel: {
    id: "",
    name: ""
  },

  directs: [],

  currDirect: {
    id: "",
    name: ""
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    case SET_CHANNEL:
      return {
        ...state,
        channels: action.payload, // Update the channels array directly
      };
      case SET_CURRCHANNEL:
        return {
          ...state,
          currChannel: action.payload
        };
        case SET_MESSAGES:
        return {
          ...state,
          messages: action.payload
        };
        case SET_DIRECT:
        return {
          ...state,
          directs: action.payload
        };
        case SET_CURRDIRECT:
        return {
          ...state,
          currDirect: action.payload
        };
    default:
      return state;
  }
};

export default reducer;
