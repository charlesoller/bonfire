import styles from "./ServerUser.module.css"

export default function ServerUser({ name, img }){
    return (
        <div className={styles.user}>
            {/* <FaUserCircle size={32} /> */}
            <img src={img} className={styles.profile_picture} />
            <h5 className={styles.user__name}>{name}</h5>
        </div>
    )
}