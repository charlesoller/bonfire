import styles from "./MessageLayout.module.css"
// Util
import { useMemo, useEffect, useState, useRef } from "react"
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { createMessageThunk } from "../../redux/message";


// Components
import Message from "../Message/Message"
import MessageInput from "../MessageInput/MessageInput"

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';
let socket;
export default function MessageLayout({ defaultMessages, channelId }) {
    const dispatch = useDispatch()
    const currentUser = Object.values(useSelector((state) => state.currentUser))[0];
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(URL);
        socket.on('chat', (data) => {
            const { text_field: text, user, date } = data;
            const newMessage = {
                channel_id: channelId,
                created_at: date,
                updated_at: date,
                message_id: defaultMessages.length + 1,
                text_field: text,
                user
            }

            setMessages(messages => [...messages, newMessage])
        })

        return (() => {
            socket.disconnect()
        })
    }, []);

    useEffect(() => {
        // socket.emit('leave', { room: prevRoom })
        socket.emit('join', { room: channelId })
        setMessages(defaultMessages)
    }, [channelId])

    const handleSendMessage = (e, text_field) => {
        e.preventDefault()
        dispatch(createMessageThunk(channelId, text_field, currentUser.id))
        console.log("CURRENT USER: ", currentUser)
        socket.emit('chat', { text_field, room: channelId, user: currentUser, date: new Date() });
    }

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
            <MessageInput channelId={channelId} handleSendMessage={handleSendMessage} />
        </div>
    )
}