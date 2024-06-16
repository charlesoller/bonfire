import { getChannelsForServerId, addChannel } from "../utils/api"

export const LOAD_CHANNELS = 'channels/LOAD_CHANNELS'
export const LOAD_ONE_CHANNEL = 'channels/LOAD_ONE_CHANNEL'


// ================= ACTION CREATORS ================= 
export const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
})

export const loadOneChannel = (channel) => ({
    type: LOAD_ONE_CHANNEL,
    channel
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

        case LOAD_ONE_CHANNEL: {
            const id = Object.keys(action.channel)[0]
            return { ...state, [id]: action.channel[id]};
        }

        default:
            return state;
    }
}

export default channelReducer;