import styles from "./ServerView.module.css"

// Util
import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"
import { fetchChannelMessagesThunk } from "../../redux/message"
import { fetchServerUsersThunk } from "../../redux/serverUser"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"
import ChannelNav from "../ChannelNav/ChannelNav"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import UserList from "../UserList/UserList"

export default function ServerView({ activeServerId, activeServer }) {
    const dispatch = useDispatch()
    const [activeChannelId, setActiveChannelId] = useState(1);
    const channels = Object.values(useSelector((state) => state.channels))
    const messages = Object.values(useSelector((state) => state.messages));
    const serverUsers = Object.values(useSelector((state) => state.serverUsers));
    const activeChannel = useMemo(() => channels.filter(channel => channel.id === activeChannelId)[0], [activeChannelId, channels]);

    useEffect(() => {
        dispatch(fetchChannelsForServerIdThunk(activeServerId));
        dispatch(fetchChannelMessagesThunk(activeChannelId))
        dispatch(fetchServerUsersThunk(activeServerId))
    }, [dispatch, activeServerId, activeChannelId])

    useEffect(() => {
        // This is responsible for changing the active channel when the server changes
        setActiveChannelId(channels[0]?.id)
    }, [activeServerId, channels])
    
    return (
        <section className={styles.serverView}>
            <ChannelNav channels={channels} activeChannel={activeChannel} setActiveChannel={setActiveChannelId} activeServer={activeServer} />
            <HeaderInfo activeChannel={activeChannel} />
            <MessageLayout messages={messages} channelId={activeChannelId}/>
            <UserList users={serverUsers} />
        </section>
    )
}