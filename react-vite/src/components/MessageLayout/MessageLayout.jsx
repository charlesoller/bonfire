import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useRef } from "react"
// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

export default function MessageLayout({ messages, channelId }){
    const messageElements = useMemo(() => messages.map((message) => (
        <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user?.username} img={message.user?.profile_image[0].url}/>
    )), [messages])
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, [messages]);

    return (
        <div className={styles.main}>
            <div className={styles.messages} ref={containerRef}>
                {messageElements}
            </div>
            <MessageInput channelId={channelId}/>
        </div>
    )
}