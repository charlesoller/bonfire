import { getAllServers, addServer, updateServer, deleteServer, addChannel, updateChannel, deleteChannel } from "../utils/api"

export const LOAD_SERVERS = 'servers/LOAD_SERVERS'
export const LOAD_ONE_SERVER = 'servers/LOAD_ONE_SERVER'
export const CLEAR_SERVER_DETAILS = 'servers/CLEAR_SERVER_DETAILS'
export const REMOVE_SERVER = 'servers/REMOVE_SERVER'
export const UPDATE_SERVER = 'servers/UPDATE_SERVER'
export const LOAD_CHANNEL = 'channels/LOAD_CHANNEL'

// ================= ACTION CREATORS ================= 
export const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
})

export const loadOneServer = (server) => ({
    type: LOAD_ONE_SERVER,
    server
})

export const clearServerDetails = () => ({
    type: CLEAR_SERVER_DETAILS
})

export const loadUpdateServer = (server) => ({
    type: UPDATE_SERVER,
    server
})

export const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    serverId
})

export const loadChannel = (channel) => ({
    type: LOAD_CHANNEL,
    channel,
})

// ================= THUNKS ================= 
export const fetchAllServersThunk = () => async (dispatch) => {
    const res = await getAllServers();
    dispatch(loadServers(res))
}

export const addNewServer = (server) => async (dispatch) => {
    const res = await addServer(server);
    dispatch(loadOneServer(res))
}

export const updateOldServer = (server) => async (dispatch) => {
    const res = await updateServer(server);
    dispatch(loadUpdateServer(res))
}

export const deleteAServer = (serverId) => async dispatch => {
    const res = await deleteServer(serverId);
    dispatch(removeServer(res))
}

export const addNewChannel = (channel, serverId) => async (dispatch) => {
    await addChannel(channel,serverId);
    dispatch(fetchAllServersThunk())
}

export const updateOldChannel = (channel) => async (dispatch) => {
    console.log("UPDATE CHANNEL", channel)
    await updateChannel(channel);
    dispatch(fetchAllServersThunk())
}

export const deleteAChannel = (channelId) => async (dispatch) => {
    console.log("DELETE CHANNEL", channelId)
    await deleteChannel(channelId)
    dispatch(fetchAllServersThunk())
}


// ================= REDUCER ================= 
const serverReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SERVERS: {
            const serversState = {};
            action.servers.forEach((server) => {
                serversState[server.id] = server;
            })
            return serversState;
        }

        case LOAD_ONE_SERVER: {
            const id = Object.keys(action.server)[0]
            return { ...state, [id]: action.server[id]};
        }

        case UPDATE_SERVER: {
            const id = Object.keys(action.server.id)
            return { ...state, [id]: action.server};
        }

        case REMOVE_SERVER: {
            const newState = {...state};
            delete newState[action.serverId];
            return newState;
        }

        case CLEAR_SERVER_DETAILS: {
            return {};
        }
        
        default:
            return state;
    }
}

export default serverReducer;

