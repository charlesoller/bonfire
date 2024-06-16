import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useModal } from "../../context/Modal";
import styles from "./SignOutModal.module.css";

function SignOutModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSignOut = async (e) => {
        e.preventDefault();
        console.log("Signing out...");
        await dispatch(thunkLogout());
        console.log("Signed out, closing modal...");
        closeModal();
        console.log("Redirecting to login...");
        window.location.href = '/login';
    };

    return (
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>Sure you want to leave?</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleSignOut} className={styles.modalButton}>Yes</button>
                <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>No</button>
            </div>
        </div>
    );
}

export default SignOutModal;
