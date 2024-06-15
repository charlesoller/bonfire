// import { FaUserCircle } from "react-icons/fa"
import styles from "./Message.module.css"
import { formatDate } from "./utils/utils"

export default function Message({ text, date, name, img = "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"}){
    console.log("DATE: ", date)
    return (
        <article className={styles.message}>
            <img className={styles.profile_picture} src={img} />
            <div>
                <div className={styles.userDetails}>
                    <h5 className={styles.userName}>{name}</h5>
                    <p className={styles.date}>{formatDate(date)}</p>
                </div>
                <p className={styles.textBody}>{text}</p>
            </div>
        </article>
    )
}