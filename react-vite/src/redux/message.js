import { getChannelMessages } from "../utils/api"

export const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'

// ================= ACTION CREATORS ================= 
export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

// ================= THUNKS ================= 
export const fetchChannelMessagesThunk = (id) => async (dispatch) => {
    const res = await getChannelMessages(id);
    dispatch(loadMessages(res));
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
        default:
            return state;
    }
}

export default messageReducer;