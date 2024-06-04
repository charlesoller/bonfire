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

export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const [activeServerId, setActiveServerId] = useState(1);
    const servers = Object.values(useSelector((state) => state.servers));
    const channels = Object.values(useSelector((state) => state.channels))
    // getChannelMessages(1)
    // getChannelsForServerId(1)

    useEffect(() => {
        dispatch(fetchAllServersThunk());
    }, [dispatch])

    return (
        <main className={styles.body}> 
            <ServerNav servers={servers}/>
            <ChannelNav />
            <section className={styles.main}>
                <HeaderInfo />
                <div className={styles.channel_view}>
                    <ServerView 
                        activeServerId={activeServerId}
                    />
                    <UserList />
                </div>
            </section>
        </main>
    )
}