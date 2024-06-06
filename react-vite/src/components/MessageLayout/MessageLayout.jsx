import styles from "./MessageLayout.module.css"
// Util
import { useMemo } from "react"
import Message from "../Message/Message"

export default function MessageLayout({ messages }){

    // console.log(messages)
    const messageElements = useMemo(() => messages.map((message) => (
        <Message key={message.id} text={message.text_field}/>
    )), [messages])

    return (
        <div className={styles.main}>
            {messageElements}
        </div>
    )
}