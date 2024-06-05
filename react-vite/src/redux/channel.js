import { getChannelsForServerId } from "../utils/api"

export const LOAD_CHANNELS = 'channels/LOAD_CHANNELS'

// ================= ACTION CREATORS ================= 
export const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
})

// ================= THUNKS ================= 
export const fetchChannelsForServerIdThunk = (id) => async (dispatch) => {
    const res = await getChannelsForServerId(id);
    dispatch(loadChannels(res));
}

// ================= REDUCER ================= 
const channelReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CHANNELS: {
            const channelsState = {};
            action.channels.forEach((channel) => {
                channelsState[channel.id] = channel;
            })
            return channelsState;
        }
        default:
            return state;
    }
}

export default channelReducer;