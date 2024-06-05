import styles from "./ChannelOption.module.css"

export default function ChannelOption({id, name, setActiveChannel}){
    return (
        <div className={styles.container} onClick={() => setActiveChannel(id)}>
            <h1 className={styles.text}>{name.toLowerCase()}</h1>
        </div>
    )
}