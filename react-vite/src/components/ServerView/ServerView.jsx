import styles from "./ServerView.module.css"
import MessageLayout from "../MessageLayout/MessageLayout"
import { getChannelMessages } from "../../utils/api"
import { useEffect } from "react"

export default function ServerView() {
    useEffect(() => {
        getChannelMessages(1)
    }, [])
    return (
        <section className={styles.serverView}>
            <MessageLayout />
        </section>
    )
}