import styles from "./ChannelOption.module.css"

export default function ChannelOption({id, name, activeChannelId, setActiveChannel, setPrevChannel, active}){
    const activeStyle = active ? {"background": "#37393f"} : {}
    const handleChangeChannel = () => {
        console.log("ACTIVE CHANNEL ID: ", activeChannelId)
        setPrevChannel(activeChannelId);
        setActiveChannel(id);
    }

    return (
        <div className={styles.container} onClick={handleChangeChannel} style={activeStyle}>
            <h1 className={styles.text}>{name.toLowerCase()}</h1>
        </div>
    )
}