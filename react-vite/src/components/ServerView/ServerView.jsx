import styles from "./ServerView.module.css"

// Util
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { fetchAllServersThunk } from "../../redux/server"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"
import ChannelNav from "../ChannelNav/ChannelNav"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import UserList from "../UserList/UserList"

export default function ServerView({ activeServerId, messages }) {
    const dispatch = useDispatch()
    const [activeChannelId, setActiveChannelId] = useState(1);
    const channels = Object.values(useSelector((state) => state.channels))
    console.log(activeChannelId)
    useEffect(() => {
        dispatch(fetchChannelsForServerIdThunk(activeServerId));
    }, [dispatch, activeServerId])

    return (
        <section className={styles.serverView}>
            <ChannelNav channels={channels} setActiveChannel={setActiveChannelId}/>
            <HeaderInfo />
            <MessageLayout />
            <UserList />
        </section>
    )
}