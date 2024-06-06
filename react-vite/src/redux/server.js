import { getAllServers, addServer } from "../utils/api"

export const LOAD_SERVERS = 'servers/LOAD_SERVERS'
export const LOAD_ONE_SERVER = 'servers/LOAD_ONE_SERVER'
export const CLEAR_SERVER_DETAILS = 'servers/CLEAR_SERVER_DETAILS'

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

// ================= THUNKS ================= 
export const fetchAllServersThunk = () => async (dispatch) => {
    const res = await getAllServers();
    dispatch(loadServers(res))
}

export const addNewServer = (server) => async (dispatch) => {
    const res = await addServer(server);
    dispatch(loadOneServer(res))
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
            return { ...state, [action.server.id]: action.server};
        }

        case CLEAR_SERVER_DETAILS: {
            return {};
        }
        
        default:
            return state;
    }
}

export default serverReducer;

