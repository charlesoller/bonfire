import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useState, useRef } from "react"
import { io } from 'socket.io-client'
let socket;

// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

export default function MessageLayout({ defaultMessages, channelId }){
    const [messages, setMessages] = useState(defaultMessages);
    const messageElements = useMemo(() => defaultMessages.map((message) => (
        <Message key={message.id} text={message.text_field} date={message.updated_at} name={message.user?.username} img={message.user?.profile_image[0].url}/>
    )), [defaultMessages])
    const containerRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, [messages]);

    useEffect(() => {
        socket = io();
        console.log(socket)
        socket.on('message', (chat) => {
          // dispatch(getAllMessages(channel_id))
          console.log("HERE")
          setMessages(messages => [...messages, chat])
        })
        return (() => {
          socket.off()
        })
      }, [])

    return (
        <div className={styles.main}>
            <div className={styles.messages} ref={containerRef}>
                {messageElements}
            </div>
            <MessageInput channelId={channelId} socket={socket}/>
        </div>
    )
}