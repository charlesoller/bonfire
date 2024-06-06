import styles from "./MessageLayout.module.css"
// Util
import { useMemo } from "react"
import Message from "../Message/Message"

export default function MessageLayout({ messages }){

    const messageElements = useMemo(() => messages.map((message) => (
        <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user.username} />
    )), [messages])

    return (
        <div className={styles.main}>
            {messageElements}
        </div>
    )
}