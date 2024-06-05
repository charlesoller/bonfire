import styles from "./ServerIcon.module.css"

export default function ServerIcon({ image, id, setActiveServerId }){
    return (
        <div className={styles.container} onClick={() => setActiveServerId(id)}>
            <img className={styles.image} src={image} />
        </div>
    )
}