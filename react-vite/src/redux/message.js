import { getChannelMessages, createChannelMessage, getAllMessages } from "../utils/api"

export const LOAD_ALL_MESSAGES = 'messages/LOAD_ALL_MESSAGES'
export const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
export const ADD_MESSAGE = 'messages/ADD_MESSAGE';

// ================= ACTION CREATORS ================= 
export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message,
});

export const loadAllMessages = (messages) => ({
    type: LOAD_ALL_MESSAGES,
    messages
})

// ================= THUNKS ================= 
export const fetchChannelMessagesThunk = (id) => async (dispatch) => {
    const res = await getChannelMessages(id);
    dispatch(loadMessages(res));
}

export const createMessageThunk = (channelId, message, userId) => async (dispatch) => {
    const newMessage = await createChannelMessage(channelId, message, userId);
    dispatch(addMessage(newMessage));
}

export const fetchAllMessagesThunk = () => async (dispatch) => {
    const res = await getAllMessages();
    dispatch(loadAllMessages(res));
}

// ================= REDUCER ================= 
const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MESSAGES: {
            const messagesState = {};
            action.messages.forEach((message) => {
                messagesState[message.message_id] = message;
            })
            return messagesState;
        }
        case LOAD_ALL_MESSAGES: {
            const messagesState = {};
            action.messages.forEach((message) => {
                messagesState[message.message_id] = message;
            })
            return messagesState;
        }
        case ADD_MESSAGE: {
            return { ...state, [action.message.message_id]: action.message};
        }
        default:
            return state;
    }
}

export default messageReducer;