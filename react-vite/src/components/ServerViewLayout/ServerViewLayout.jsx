import styles from "./ServerViewLayout.module.css"

// Util
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
// import { getChannelMessages, getChannelsForServerId } from "../../utils/api"

// Components
import { Outlet } from "react-router-dom"
import ServerNav from "../ServerNav/ServerNav"
import ChannelNav from "../ChannelNav/ChannelNav"
import UserList from "../UserList/UserList"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import ServerView from "../ServerView/ServerView"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"
import { fetchChannelMessagesThunk } from "../../redux/message"

export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const [activeServerId, setActiveServerId] = useState(1);
    const [activeChannelId, setActiveChannelId] = useState(1);

    const servers = Object.values(useSelector((state) => state.servers));
    console.log(servers)
    const channels = Object.values(useSelector((state) => state.channels));
    const messages = Object.values(useSelector((state) => state.messages));

    console.log(messages)

    useEffect(() => {
        dispatch(fetchAllServersThunk());
        dispatch(fetchChannelsForServerIdThunk(activeServerId))
        dispatch(fetchChannelMessagesThunk(activeChannelId))
    }, [dispatch, activeServerId, activeChannelId])

    return (
        <main className={styles.body}> 
            <ServerNav servers={servers}/>
            <ChannelNav 
                channels={channels}
            />
            <section className={styles.main}>
                <HeaderInfo />
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServerId={activeServerId}
                        activeChannelId={activeChannelId}
                        messages={messages}
                    />
                    <UserList />
                </div>
            </section>
        </main>
    )
}