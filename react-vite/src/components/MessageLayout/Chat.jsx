import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';
// const socket = io(URL, { reconnection: true })
// console.log("SOCKET: ", socket)

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    // const user = useSelector(state => state.session.user)


    return (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            {/* <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form> */}
        </div>
    )
};


export default Chat;