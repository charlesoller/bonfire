import styles from "./HeaderInfo.module.css"
import { FaCode } from "react-icons/fa"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import SignOutModal from "../SignOutModal/SignOutModal"

export default function HeaderInfo({ activeChannel }){
    return (
        <header className={styles.headerInfo}>
            <div className={styles.left}>
                <FaCode />
                <h3 className={styles.headerTitle}>{ activeChannel?.name || "Loading..." }</h3>
            </div>
            <div className={styles.signOutContainer}>
                <OpenModalButton
                    buttonText="Sign Out"
                    modalComponent={<SignOutModal />}
                    className={styles.signOutButton}
                />
            </div>
        </header>
    )
}