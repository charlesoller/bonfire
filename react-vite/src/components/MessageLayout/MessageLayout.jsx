import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

export default function MessageLayout({ defaultMessages = [], channelId }) {
    const currentUser = Object.values(useSelector((state) => state.currentUser))[0];
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(defaultMessages)
    }, [defaultMessages])


    const messageElements = useMemo(() => messages.map((message) => {
        const { user } = message;
        const url = user?.profile_images[0]?.url || undefined
        return <Message 
            key={message.message_id} 
            id={message.message_id} 
            text={message.text_field} 
            date={message.updated_at} 
            name={message.user?.username} 
            img={url} channelId={channelId} 
            reactions={message.reactions}
            ownerId={message.user.id}
            currentUser={currentUser}
        />
    }), [messages, channelId, currentUser])

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
            <MessageInput channelId={channelId} />
        </div>
    )
}