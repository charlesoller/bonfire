import styles from "./ChannelNav.module.css"
// Util
import { useMemo } from "react"
// Components
import { FaCode } from "react-icons/fa"
import ChannelOption from "./components/ChannelOption"

export default function ChannelNav({ channels, activeChannel, setActiveChannel, setPrevChannel, activeServer }){
    const channelElements = useMemo(() => channels.map(channel => (
        <ChannelOption id={channel.id} key={channel.id} name={channel.name} activeChannelId={activeChannel?.id} setActiveChannel={setActiveChannel} setPrevChannel={setPrevChannel} active={channel.id === activeChannel?.id}/>
    )), [channels, activeChannel, setActiveChannel, setPrevChannel])

    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <FaCode className={styles.channelName__logo}/>
                <h1 className={styles.channelName__header}>{activeServer?.name || "Loading..."}</h1>
            </div>
            <div className={styles.channelOptions}>
                {channelElements}
            </div>
        </aside>
    )
}