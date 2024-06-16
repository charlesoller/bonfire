import { useMemo } from "react"
import styles from "./UserList.module.css"
import { FaUserCircle } from "react-icons/fa"
import ServerUser from "./components/ServerUser"

export default function UserList({ users = [] }){
    const userElements = useMemo(() => users.map(user => (
        <ServerUser key={user.id} name={user.username} img={user.profile_images?.[0]?.url || 'https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg'} />
    )), [users])

    return (
        <aside className={styles.userList}>
            <h5 className={styles.userRoleName}>{`${users.length} USER${users.length > 1 ? 'S' : ''}`}</h5>
            { userElements }
        </aside>
    )
}