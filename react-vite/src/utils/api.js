export const getChannelMessages = async (channelId) => {
    const res = await fetch(`/api/channels/${channelId}/messages`)
        .then(res => res.json())
        .catch(e => console.error(e))
    return res
}

export const getAllServers = async () => {
    const res = await fetch(`/api/servers`)
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const getChannelsForServerId = async (serverId) => {
    const res = await fetch(`/api/servers/${serverId}/channels`)
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const getUsersForServerId = async (serverId) => {
    
}