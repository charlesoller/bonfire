import { FaUserCircle } from "react-icons/fa"
import styles from "./Message.module.css"

export default function Message(){
    return (
        <article className={styles.message}>
            <FaUserCircle size={80} className={styles.icon}/>
            <div>
                <div className={styles.userDetails}>
                    <h5 className={styles.userName}>First Last</h5>
                    <p className={styles.date}>4/05/24 10:15 AM</p>
                </div>
                <p className={styles.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </article>
    )
}