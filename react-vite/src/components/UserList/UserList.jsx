import { useMemo } from "react"
import styles from "./UserList.module.css"
import { FaUserCircle } from "react-icons/fa"
import ServerUser from "./components/ServerUser"

export default function UserList({ users }){
    console.log(users)
    const userElements = useMemo(() => users.map(user => (
        <ServerUser key={user.id} name={user.name} />
    )), [users])

    return (
        <aside className={styles.userList}>
            <h5 className={styles.userRoleName}>ROLE NAME - 25</h5>
            { userElements }
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