import styles from "./ChannelNav.module.css"
// Util
import { useMemo } from "react"
// Components
import { FaCode } from "react-icons/fa"
import ChannelOption from "./components/ChannelOption"

export default function ChannelNav({ channels, setActiveChannel }){
    const channelElements = useMemo(() => channels.map(channel => (
        <ChannelOption id={channel.id} key={channel.id} name={channel.name} setActiveChannel={setActiveChannel} />
    )), [channels, setActiveChannel])

    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <FaCode className={styles.channelName__logo}/>
                <h1 className={styles.channelName__header}>Server Name</h1>
            </div>
            <div className={styles.channelOptions}>
                {channelElements}
            </div>
        </aside>
    )
}