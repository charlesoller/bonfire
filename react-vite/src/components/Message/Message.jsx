import { FaUserCircle } from "react-icons/fa"
import styles from "./Message.module.css"

export default function Message({ text }){
    return (
        <article className={styles.message}>
            <FaUserCircle size={80} className={styles.icon}/>
            <div>
                <div className={styles.userDetails}>
                    <h5 className={styles.userName}>First Last</h5>
                    <p className={styles.date}>4/05/24 10:15 AM</p>
                </div>
                <p className={styles.textBody}>{text}</p>
            </div>
        </article>
    )
}