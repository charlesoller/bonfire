import { useMemo } from "react"
import styles from "./UserList.module.css"
import { FaUserCircle } from "react-icons/fa"
import ServerUser from "./components/ServerUser"

export default function UserList({ users }){
    const userElements = useMemo(() => users.map(user => (
        <ServerUser key={user.id} name={user.username} img={user.profile_images[0].url} />
    )), [users])

    return (
        <aside className={styles.userList}>
            <h5 className={styles.userRoleName}>{`${users.length} USER${users.length > 1 ? 'S' : ''}`}</h5>
            { userElements }
        </aside>
    )
}