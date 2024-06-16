export const getChannelMessages = async (channelId) => {
    const res = await fetch(`/api/channels/${channelId}/messages`)
        .then(res => res.json())
        .catch(e => console.error(e))
    return res
}

export const getAllMessages = async () => {
    const res = await fetch(`/api/messages/`)
        .then(res => res.json())
        .catch(e => console.error(e))

    return res
}

export const getAllServers = async () => {
    const res = await fetch(`/api/servers/`)
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
    const res = await fetch(`/api/servers/${serverId}/users`)
        .then(res => res.json())
        .catch(e => console.error(e))

    return res;
}

export const addServer = async (server) => {
    const res = await fetch('/api/servers/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(server)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const createChannelMessage = async (channelId, message, userId) => {
    const res = await fetch(`/api/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text_field: message, user_id: userId}),
    });
    if (res.ok) {
        const data = await res.json();
        // console.log('API call createChannelMessage response:', data);
        return data;
    }
    throw new Error('Failed to create message');
};

export const updateChannelMessage = async (messageId, message) => {
    const res = await fetch(`/api/channels/channel_messages/${messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),  // Ensure this is a plain object
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error('Failed to update message');
};

export const deleteChannelMessage = async (messageId) => {
    const res = await fetch(`/api/channels/channel_messages/${messageId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        return { messageId };
    }
    throw new Error('Failed to delete message');
};

export const getCurrentUser = async () => {
    const res = await fetch(`/api/users/current`)
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const updateServer = async (server) => {
    const res = await fetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(server)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const deleteServer = async (serverId) => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    return res;
}

export const addMessageReaction = async (messageId, emoji, userId) => {
    const res = await fetch(`/api/channels/channel_messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji, user_id: userId }),
    })

    if (res.ok) {
        // const test = await res.json()
        // console.log("RES: ", test)
        return await res.json();
    }
    throw new Error('Failed to add reaction');
};

export const deleteReaction = async (reactionId) => {
    const res = await fetch(`/api/channels/reactions/${reactionId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        return { reactionId };
    }
    throw new Error('Failed to delete reaction');
};

export const incrementReaction = async (reactionId) => {
    const res = await fetch(`/api/channels/reactions/${reactionId}`, {
        method: 'PUT',
    });
    if (res.ok) {
        return { reactionId };
    }
    throw new Error('Failed to delete reaction');
}
