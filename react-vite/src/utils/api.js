export const getChannelMessages = async (channelId) => {
    const res = await fetch(`/api/channels/${channelId}/messages`, {
        headers: { 
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .catch(e => console.error(e))

    // console.log("MESSAGES: ", res)
    return res
}

export const getAllServers = async () => {
    const res = await fetch(`/api/servers`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}