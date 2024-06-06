import styles from "./ServerView.module.css"

// Util
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"
import { fetchChannelMessagesThunk } from "../../redux/message"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"
import ChannelNav from "../ChannelNav/ChannelNav"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import UserList from "../UserList/UserList"

export default function ServerView({ activeServerId }) {
    const dispatch = useDispatch()
    const [activeChannelId, setActiveChannelId] = useState(1);
    const channels = Object.values(useSelector((state) => state.channels))
    const messages = Object.values(useSelector((state) => state.messages));
    console.log(messages)
    console.log(activeChannelId)
    useEffect(() => {
        dispatch(fetchChannelsForServerIdThunk(activeServerId));
        dispatch(fetchChannelMessagesThunk(activeChannelId))
    }, [dispatch, activeServerId, activeChannelId])

    return (
        <section className={styles.serverView}>
            <ChannelNav channels={channels} setActiveChannel={setActiveChannelId}/>
            <HeaderInfo />
            <MessageLayout messages={messages}/>
            <UserList />
        </section>
    )
}