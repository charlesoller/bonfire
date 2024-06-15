import styles from "./HeaderInfo.module.css";
import { FaCode, FaGear } from "react-icons/fa6";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import SignOutModal from "../SignOutModal/SignOutModal";

export default function HeaderInfo({ activeServer, activeChannel }) {
    return (
        <>
            <header className={styles.headerInfo}>
                <FaCode />
                <h3 className={styles.headerTitle}>{activeChannel?.name || "Loading..."}</h3>
                <OpenModalButton
                    buttonText={<FaGear className={styles.buttonIcon} />}
                    modalComponent={<NewServerModal server={activeServer} formType="Update Server" />}
                    className={styles.button}
                />
            </header>
            <div className={styles.signOutContainer}>
                <OpenModalButton
                    buttonText="Sign Out"
                    modalComponent={<SignOutModal />}
                    className={styles.signOutButton}
                />
            </div>
        </>
    );
}
