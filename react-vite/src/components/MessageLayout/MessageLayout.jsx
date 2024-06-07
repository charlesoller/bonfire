import styles from "./MessageLayout.module.css"
// Util
import { useMemo } from "react"
// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

export default function MessageLayout({ messages, channelId }){
    const messageElements = useMemo(() => messages.map((message) => (
        <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user.username} img={message.user.profile_image[0].url}/>
    )), [messages])

    return (
        <div className={styles.main}>
            {messageElements}
            <MessageInput channelId={channelId}/>
        </div>
    )
}