import styles from "./UserList.module.css"
import { FaUserCircle } from "react-icons/fa"

export default function UserList(){
    return (
        <aside className={styles.userList}>
            <h5 className={styles.userRoleName}>ROLE NAME - 25</h5>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <h5 className={styles.userRoleName}>ROLE NAME - 15</h5>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
            <div className={styles.user}>
                <FaUserCircle size={32} />
                <h5 className={styles.user__name}>First Last</h5>
            </div>
        </aside>
    )
}