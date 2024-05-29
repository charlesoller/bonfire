import styles from "./ChannelNav.module.css"

export default function ChannelNav(){
    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <h1 className={styles.channelName__header}>Channel Name</h1>
            </div>
        </aside>
    )
}