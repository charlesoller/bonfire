
const BASE_URL = "http://127.0.0.1:8000/api"

export const getChannelMessages = async (channelId) => {
    const res = await fetch(`${BASE_URL}/channels/${channelId}/messages`, {
        headers: { 
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
    console.log("TEST: ", res)
    return res
}