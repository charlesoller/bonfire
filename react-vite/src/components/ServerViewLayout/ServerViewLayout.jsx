import styles from "./ServerViewLayout.module.css"

// Util
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
// import { getChannelMessages, getChannelsForServerId } from "../../utils/api"

// Components
import ServerNav from "../ServerNav/ServerNav"
import ServerView from "../ServerView/ServerView"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"
import { fetchChannelMessagesThunk } from "../../redux/message"
import { fetchServerUsersThunk } from "../../redux/serverUser"

export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const [activeServerId, setActiveServerId] = useState(1);
    const [activeChannelId, setActiveChannelId] = useState(1);

    const servers = Object.values(useSelector((state) => state.servers));
    const channels = Object.values(useSelector((state) => state.channels));
    const messages = Object.values(useSelector((state) => state.messages));
    const serverUsers = Object.values(useSelector((state) => state.serverUsers));

    useEffect(() => {
        dispatch(fetchAllServersThunk());
        dispatch(fetchChannelsForServerIdThunk(activeServerId))
        dispatch(fetchChannelMessagesThunk(activeChannelId))
        dispatch(fetchServerUsersThunk(activeServerId))
    }, [dispatch, activeServerId, activeChannelId])
    console.log(activeServerId)
    return (
        <main className={styles.body}> 
            <ServerNav servers={servers} setActiveServerId={setActiveServerId}/>
            <section className={styles.main}>
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServerId={activeServerId}
                        activeChannelId={activeChannelId}
                        messages={messages}
                    />
                </div>
            </section>
        </main>
    )
}