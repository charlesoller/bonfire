// import { FaUserCircle } from "react-icons/fa"
import styles from "./Message.module.css"

export default function Message({ text, date, name, img }){
    return (
        <article className={styles.message}>
            {/* <FaUserCircle size={80} className={styles.icon}/> */}
            <img className={styles.profile_picture} src={img} />
            <div>
                <div className={styles.userDetails}>
                    <h5 className={styles.userName}>{name}</h5>
                    <p className={styles.date}>{date}</p>
                </div>
                <p className={styles.textBody}>{text}</p>
            </div>
        </article>
    )
}