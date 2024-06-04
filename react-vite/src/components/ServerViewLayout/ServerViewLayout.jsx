import styles from "./ServerViewLayout.module.css"

// Util
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"
import { getChannelMessages } from "../../utils/api"

// Components
import { Outlet } from "react-router-dom"
import ServerNav from "../ServerNav/ServerNav"
import ChannelNav from "../ChannelNav/ChannelNav"
import UserList from "../UserList/UserList"
import HeaderInfo from "../HeaderInfo/HeaderInfo"


export default function ServerViewLayout(){
    const dispatch = useDispatch();
    const servers = Object.values(useSelector((state) => state.servers));
    getChannelMessages(1)

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
                    <Outlet />
                    <UserList />
                </div>
            </section>
        </main>
    )
}