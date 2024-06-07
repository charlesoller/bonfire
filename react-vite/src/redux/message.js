import { getChannelMessages, createChannelMessage } from "../utils/api"

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

// ================= THUNKS ================= 
export const fetchChannelMessagesThunk = (id) => async (dispatch) => {
    const res = await getChannelMessages(id);
    dispatch(loadMessages(res));
}

export const createMessageThunk = (channelId, message) => async (dispatch) => {
    const newMessage = await createChannelMessage(channelId, message);
    dispatch(addMessage(newMessage));
}

// ================= REDUCER ================= 
const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MESSAGES: {
            const messagesState = {};
            action.messages.forEach((message) => {
                messagesState[message.id] = message;
            })
            return messagesState;
        }
        case ADD_MESSAGE: {
            const newState = { ...state };
            const channelMessages = newState[action.message.channel_id] || [];
            channelMessages.push(action.message);
            newState[action.message.channel_id] = channelMessages;
            return newState;
        }
        default:
            return state;
    }
}

export default messageReducer;