import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useState, useRef } from "react"
import { io } from 'socket.io-client'

// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"
import Chat from "./Chat"

let socket;
export default function MessageLayout({ defaultMessages, channelId }){
    const messageElements = useMemo(() => defaultMessages.map((message) => (
        <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user?.username} img={message.user?.profile_image[0].url}/>
    )), [defaultMessages])
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [defaultMessages]);


    return (
        <div className={styles.main}>
            {/* <div className={styles.messages} ref={containerRef}>
                {messageElements}
            </div>
            <MessageInput channelId={channelId} socket={socket}/> */}
            {/* <Chat /> */}
        </div>
    )
}