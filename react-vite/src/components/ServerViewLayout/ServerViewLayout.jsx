import styles from "./ServerViewLayout.module.css"

// Util
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
import { fetchAllMessagesThunk, fetchChannelMessagesThunk } from "../../redux/message"
import { fetchCurrentUser } from "../../redux/serverUser"
// import { getChannelMessages, getChannelsForServerId } from "../../utils/api"
import { socket } from "../../socket"

// Components
import ServerNav from "../ServerNav/ServerNav"
import ServerView from "../ServerView/ServerView"

export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const [activeServerId, setActiveServerId] = useState(1);
    const [activeChannelId, setActiveChannelId] = useState(1);
    const [prevChannelId, setPrevChannelId] = useState(1);
    const [isConnected, setIsConnected] = useState(false);

    const servers = Object.values(useSelector((state) => state.servers));
    const messages = Object.values(useSelector((state => state.messages)))
    const currentUser = Object.values(useSelector((state) => state.currentUser));

    const channels = useMemo(() => servers.map(server => server.channels).flat(), [servers])

    const activeServer = useMemo(() => servers.find(server => server.id === activeServerId), [activeServerId, servers]);
    const activeChannel = useMemo(() => channels.find(channel => channel.id === activeChannelId), [activeChannelId, channels]);
    const activeServerUsers = useMemo(() => activeServer?.users?.map(user => user.user), [activeServer]);
    console.log("ACTIVE CHANNEL ID: ", activeChannelId)
    console.log("MESSAGES: ", messages)
    const activeMessages = useMemo(() => messages.filter(message => message.channel_id === activeChannelId), [activeChannelId, messages]);
    // const activeMessages = messages.filter(message => message.channel_id === activeChannelId)
    console.log("ACTIVE MESSAGES: ", activeMessages)
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
      
        function onDisconnect() {
            setIsConnected(false);
        }

        function onChat(data) {
            setTimeout(() => {
                console.log("ON CHAT")
                dispatch(fetchAllMessagesThunk());
            }, 1000);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', data => onChat(data));

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat', onChat)
        }
    }, [dispatch])

    useEffect(() => {
        socket.emit('leave', { room: prevChannelId })
        socket.emit('join', { room: activeChannelId })
    }, [activeChannelId, prevChannelId])


    useEffect(() => {
        dispatch(fetchAllServersThunk());
        dispatch(fetchAllMessagesThunk())
        dispatch(fetchCurrentUser())
    }, [dispatch])
    
    return (
        <main className={styles.body}> 
            <ServerNav 
                servers={servers} 
                setActiveServerId={setActiveServerId} 
                activeServer={activeServer} 
                activeChannelId={activeChannelId} 
                setActiveChannelId={setActiveChannelId}
                setPrevChannelId={setPrevChannelId}
            />
            <section className={styles.main}>
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServer={activeServer}
                        channels={channels}
                        activeChannel={activeChannel}
                        currentUser={currentUser}
                        activeChannelId={activeChannelId}
                        setActiveChannelId={setActiveChannelId}
                        prevChannelId={prevChannelId}
                        setPrevChannelId={setPrevChannelId}
                        messages={activeMessages}
                        serverUsers={activeServerUsers}
                    />
                </div>
            </section>
        </main>
    )
}