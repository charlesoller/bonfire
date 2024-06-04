import styles from "./ServerNav.module.css"
import { FaUserCircle } from "react-icons/fa"

export default function ServerNav({ servers }){
    console.log("Servers: ", servers)
    return (
        <aside className={styles.serverNav}>
            <div className={styles.directMessageIcon}>
                <FaUserCircle size={40}/>
            </div>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
            <FaUserCircle size={44}/>
        </aside>
    )
}