import styles from "./HeaderInfo.module.css"
import { FaCode } from "react-icons/fa"

export default function HeaderInfo({ activeChannel }){
    return (
        <header className={styles.headerInfo}>
            <FaCode />
            <h3 className={styles.headerTitle}>{ activeChannel?.name || "Loading..." }</h3>
        </header>
    )
}