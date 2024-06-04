import styles from "./ServerView.module.css"
import MessageLayout from "../MessageLayout/MessageLayout"
import { getChannelMessages, getAllServers } from "../../utils/api"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllServersThunk } from "../../redux/server"

export default function ServerView() {
    const dispatch = useDispatch();
    const servers = Object.values(useSelector((state) => state.servers));
    console.log("SELECTOR: ", servers)
    useEffect(() => {
        dispatch(fetchAllServersThunk());
    }, [dispatch])
    
    return (
        <section className={styles.serverView}>
            <MessageLayout />
        </section>
    )
}