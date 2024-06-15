import styles from "./ServerViewLayout.module.css"

// Util
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
import { fetchChannelMessagesThunk } from "../../redux/message"
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
    const activeServer = useMemo(() => servers.filter(server => server.id === activeServerId)[0], [activeServerId, servers]);
    const currentUser = Object.values(useSelector((state) => state.currentUser));
    
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
      
        function onDisconnect() {
            setIsConnected(false);
        }

        function onChat(data) {
            setTimeout(() => {
                dispatch(fetchChannelMessagesThunk(data.room));
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
    })

    useEffect(() => {
        dispatch(fetchAllServersThunk());
        dispatch(fetchCurrentUser())
    }, [dispatch, activeServerId])
    
    return (
        <main className={styles.body}> 
            <ServerNav 
                servers={servers} 
                setActiveServerId={setActiveServerId} 
                activeServer={activeServer} 
                activeChannelId={activeChannelId} 
                setPrevChannelId={setPrevChannelId}
            />
            <section className={styles.main}>
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServerId={activeServerId}
                        activeServer={activeServer}
                        currentUser={currentUser}
                        activeChannelId={activeChannelId}
                        setActiveChannelId={setActiveChannelId}
                        prevChannelId={prevChannelId}
                        setPrevChannelId={setPrevChannelId}
                    />
                </div>
            </section>
        </main>
    )
}