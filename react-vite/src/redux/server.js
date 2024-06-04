export const LOAD_SERVERS = 'servers/LOAD_SERVERS'

// ================= ACTION CREATORS ================= 
export const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
})