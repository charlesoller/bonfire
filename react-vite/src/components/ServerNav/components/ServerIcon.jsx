import styles from "./ServerIcon.module.css"
import { useMemo } from "react"

export default function ServerIcon({ image, id, setActiveServerId, activeChannelId, setActiveChannelId, setPrevChannelId, servers, isActive }){
    const server = useMemo(() => servers.find(server => server.id === id), [servers, id])

    const handleChangeChannel = () => {
        setActiveChannelId(server?.channels[0].id)
        setPrevChannelId(activeChannelId);
        setActiveServerId(id)
    }

    return (
        <div className={`${styles.container} ${isActive ? styles.active : undefined}`} onClick={handleChangeChannel}>
            <img className={styles.image} src={image} />
        </div>
    )
}