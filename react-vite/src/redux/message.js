import { getChannelMessages, createChannelMessage, getAllMessages, updateChannelMessage, deleteChannelMessage } from "../utils/api"

export const LOAD_ALL_MESSAGES = 'messages/LOAD_ALL_MESSAGES'
export const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const UPDATE_MESSAGE = 'messages/UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';

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

export const updateMessage = (message) => ({
    type: UPDATE_MESSAGE,
    message
});

export const deleteMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
});

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

export const updateMessageThunk = (messageId, newText) => async (dispatch) => {
    try {
        await updateChannelMessage(messageId, { text_field: newText });
        dispatch(fetchAllMessagesThunk());
    } catch (error) {
        console.error('Failed to update message:', error);
    }
};

export const deleteMessageThunk = (messageId) => async (dispatch) => {
    await deleteChannelMessage(messageId);
    dispatch(deleteMessage(messageId));
    // dispatch(fetchChannelMessagesThunk(channelId));
};

// ================= REDUCER ================= 
const messageReducer = (state = {}, action) => {
    switch (action.type) {
        // case LOAD_MESSAGES: {
        //     const messagesState = {};
        //     action.messages.forEach((message) => {
        //         messagesState[message.message_id] = message;
        //     })
        //     return messagesState;
        // }
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
        case DELETE_MESSAGE: {
            const newState = { ...state };
            delete newState[action.messageId]
            return newState;
        }
        default:
            return state;
    }
}

export default messageReducer;