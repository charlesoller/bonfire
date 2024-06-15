import styles from "./ServerView.module.css"

// Util
import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchChannelsForServerIdThunk } from "../../redux/channel"
import { fetchChannelMessagesThunk } from "../../redux/message"
import { fetchServerUsersThunk } from "../../redux/serverUser"

// Components
import MessageLayout from "../MessageLayout/MessageLayout"
import ChannelNav from "../ChannelNav/ChannelNav"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import UserList from "../UserList/UserList"

export default function ServerView({ activeServer, activeChannel, channels, activeChannelId, setActiveChannelId, prevChannelId, setPrevChannelId, messages, serverUsers }) {
    // console.log("ACTIVE SERVER: ", activeServer)
    // console.log("ACTIVE CHANNEL ID: ", activeChannelId)
    const activeServerChannels = useMemo(() => channels.filter(channel => channel.server_id === activeChannelId), [channels, activeChannelId])

    // useEffect(() => {
    //     console.log("RUNNING")
    //     // This is responsible for changing the active channel when the server changes
    //     setActiveChannelId(activeServer?.channels[0])
    // }, [activeServer])
    
    return (
        <section className={styles.serverView}>
            <ChannelNav 
                channels={activeServerChannels} 
                activeChannel={activeChannel} 
                setActiveChannel={setActiveChannelId} 
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