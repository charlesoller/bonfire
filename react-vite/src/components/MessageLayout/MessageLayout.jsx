import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useState, useRef } from "react"
import { socket } from "../../socket"

// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

export default function MessageLayout({ defaultMessages = [], channelId, prevChannelId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(defaultMessages)
    }, [defaultMessages])

    const messageElements = useMemo(() => messages.map((message) => {
        const { user } = message;
        const url = user?.profile_images[0]?.url || undefined
        return <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user?.username} img={url} />
    }), [messages])

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
                {/* <button onClick={sendChat}>Click</button> */}
            </div>
            <MessageInput channelId={channelId} />
        </div>
    )
}