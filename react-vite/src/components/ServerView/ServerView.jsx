import styles from "./ServerView.module.css"

// Util
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { fetchAllServersThunk } from "../../redux/server"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"

export default function ServerView({ activeServerId, activeChannelId, messages }) {
    const dispatch = useDispatch()
    const channels = Object.values(useSelector((state) => state.channels))
    // console.log("Channels: ", channels)

    useEffect(() => {
        dispatch(fetchChannelsForServerIdThunk(activeServerId));
    }, [dispatch, activeServerId])

    return (
        <section className={styles.serverView}>
            <MessageLayout />
        </section>
    )
}