import styles from "./HeaderInfo.module.css"
import { FaCode } from "react-icons/fa"

export default function HeaderInfo(){
    return (
        <header className={styles.headerInfo}>
            <FaCode />
            <h3 className={styles.headerTitle}>Channel Name</h3>
        </header>
    )
}