import { getAllServers, addServer } from "../utils/api"

export const LOAD_SERVERS = 'servers/LOAD_SERVERS'
export const LOAD_ONE_SERVER = 'servers/LOAD_ONE_SERVER'

// ================= ACTION CREATORS ================= 
export const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
})

export const loadOneServer = (server) => ({
    type: LOAD_ONE_SERVER,
    server
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
    console.log(action.type)
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
        
        default:
            return state;
    }
}

export default serverReducer;

