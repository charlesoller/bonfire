import styles from "./ServerViewLayout.module.css"

// Util
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
import { fetchAllMessagesThunk } from "../../redux/message"
import { fetchAllUsersThunk, fetchCurrentUser } from "../../redux/serverUser"
// import { getChannelMessages, getChannelsForServerId } from "../../utils/api"
import { socket } from "../../socket"

// Components
import ServerNav from "../ServerNav/ServerNav"
import ServerView from "../ServerView/ServerView"
import SignupFormPage from "../SignupFormPage"

export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const [activeServerId, setActiveServerId] = useState(1);
    const [activeChannelId, setActiveChannelId] = useState(1);
    const [prevChannelId, setPrevChannelId] = useState(1);
    // const [isConnected, setIsConnected] = useState(false);

    const servers = Object.values(useSelector((state) => state.servers));
    const messages = Object.values(useSelector((state => state.messages)))
    const currentUser = Object.values(useSelector((state) => state.currentUser));
    const allUsers = Object.values(useSelector((state) => state.serverUsers))[0];
    const channels = useMemo(() => servers.map(server => server.channels).flat(), [servers])
    const activeServer = useMemo(() => servers.find(server => server.id === activeServerId), [activeServerId, servers]);
    const activeChannel = useMemo(() => channels.find(channel => channel.id === activeChannelId), [activeChannelId, channels]);
    const activeServerUsers = useMemo(() => activeServer?.users?.map(user => user.user), [activeServer]);
    const activeMessages = useMemo(() => messages.filter(message => message.channel_id === activeChannelId), [activeChannelId, messages]);
    useEffect(() => {
        // function onConnect() {
        //     setIsConnected(true);
        // }
      
        // function onDisconnect() {
        //     setIsConnected(false);
        // }

        function onChat() {
            setTimeout(() => {
                dispatch(fetchAllMessagesThunk());
            }, 1000);
        }

        function onServer(data) {
            setTimeout(() => {
                dispatch(fetchAllServersThunk());
            }, 1000)
        
            if (data.type === 'delete' && activeServerId === Number(data.server.id)) {
                setActiveServerId(1);
                setActiveChannelId(1);
            }
        }

        // socket.on('connect', onConnect);
        // socket.on('disconnect', onDisconnect);
        socket.on('chat', data => onChat(data));
        socket.on('server', data => onServer(data));

        return () => {
            // socket.off('connect', onConnect);
            // socket.off('disconnect', onDisconnect);
            socket.off('chat', onChat);
            socket.off('server', onServer);
        }
    }, [dispatch])

    useEffect(() => {
        socket.emit('leave', { room: prevChannelId })
        socket.emit('join', { room: activeChannelId })
        dispatch(fetchAllMessagesThunk())
    }, [activeChannelId, prevChannelId, dispatch])


    useEffect(() => {
        dispatch(fetchAllServersThunk());
        dispatch(fetchAllMessagesThunk());
        dispatch(fetchAllUsersThunk());
        dispatch(fetchCurrentUser())
    }, [dispatch])
    
    if (!currentUser[0]?.id) return <SignupFormPage />

    return (
        <main className={styles.body}> 
            <ServerNav 
                servers={servers} 
                setActiveServerId={setActiveServerId} 
                activeServerId={activeServerId}
                activeChannelId={activeChannelId} 
                setActiveChannelId={setActiveChannelId}
                setPrevChannelId={setPrevChannelId}
            />
            <section className={styles.main}>
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServer={activeServer}
                        activeServerId={activeServerId}
                        channels={channels}
                        activeChannel={activeChannel}
                        currentUser={currentUser}
                        activeChannelId={activeChannelId}
                        setActiveChannelId={setActiveChannelId}
                        prevChannelId={prevChannelId}
                        setPrevChannelId={setPrevChannelId}
                        messages={activeMessages}
                        serverUsers={allUsers}
                    />
                </div>
            </section>
        </main>
    )
}