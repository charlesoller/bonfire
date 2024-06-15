import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useModal } from "../../context/Modal";
import styles from "./SignOutModal.module.css";

function SignOutModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(thunkLogout(() => {
            closeModal();
            window.location.href = '/';
        }));
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
