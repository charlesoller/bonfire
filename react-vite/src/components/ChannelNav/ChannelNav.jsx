import styles from "./ChannelNav.module.css"
import { FaCode } from "react-icons/fa"

export default function ChannelNav({ channels }){
    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <FaCode className={styles.channelName__logo}/>
                <h1 className={styles.channelName__header}>Server Name</h1>
            </div>
        </aside>
    )
}