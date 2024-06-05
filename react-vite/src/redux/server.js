import { getAllServers } from "../utils/api"

export const LOAD_SERVERS = 'servers/LOAD_SERVERS'

// ================= ACTION CREATORS ================= 
export const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
})

// ================= THUNKS ================= 
export const fetchAllServersThunk = () => async (dispatch) => {
    const res = await getAllServers();
    dispatch(loadServers(res))
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
        default:
            return state;
    }
}

export default serverReducer;

