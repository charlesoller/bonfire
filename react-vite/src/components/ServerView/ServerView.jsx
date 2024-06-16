import styles from "./ServerView.module.css"

// Util
import { useMemo } from "react"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"
import ChannelNav from "../ChannelNav/ChannelNav"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import UserList from "../UserList/UserList"

export default function ServerView({ activeServer, activeServerId, activeChannel, channels, activeChannelId, setActiveChannelId, prevChannelId, setPrevChannelId, messages, serverUsers, currentUser }) {
    const activeServerChannels = useMemo(() => channels.filter(channel => channel.server_id === activeServerId), [channels, activeServerId])

    
    return (
        <section className={styles.serverView}>
            <ChannelNav 
                currentUser={currentUser}
                channels={activeServerChannels} 
                activeChannel={activeChannel} 
                activeChannelId={activeChannelId}
                setActiveChannelId={setActiveChannelId} 
                setPrevChannel={setPrevChannelId} 
                activeServer={activeServer} 
            />
            <HeaderInfo 
                activeChannel={activeChannel} 
            />
            <MessageLayout 
                defaultMessages={messages} 
                channelId={activeChannelId} 
                prevChannelId={prevChannelId} 
            />
            <UserList users={serverUsers} />
        </section>
    )
}