import styles from "./ServerView.module.css"
import MessageLayout from "../MessageLayout/MessageLayout"
import { getChannelMessages, getAllServers } from "../../utils/api"
import { useEffect } from "react"

export default function ServerView() {
    useEffect(() => {
        getChannelMessages(1)
    }, [])
    getAllServers()
    return (
        <section className={styles.serverView}>
            <MessageLayout />
        </section>
    )
}