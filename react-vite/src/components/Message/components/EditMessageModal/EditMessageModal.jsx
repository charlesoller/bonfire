import { useState } from "react";
import { useDispatch } from "react-redux"
import { socket } from "../../../../socket";
import styles from "./EditMessageModal.module.css"

import { updateMessageThunk, deleteMessageThunk } from "../../../../redux/message";
import { useModal } from "../../../../context/Modal";

export default function EditMessageModal({ id, message, channelId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [text, setText] = useState(message);

    const handleEditMessage = (e) => {
        e.preventDefault()
        dispatch(updateMessageThunk(id, text))
        socket.emit('chat', { room: channelId, message });
        closeModal();
    }
    const handleDeleteMessage = (e) => {
        e.preventDefault();
        dispatch(deleteMessageThunk(id));
        socket.emit('chat', { room: channelId });
        closeModal();
    }

    return (
        <section className={styles.modal}>
            <form className={styles.form} onSubmit={handleEditMessage}>
                <textarea
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.buttons}>
                    <button className={styles.deleteButton} onClick={handleDeleteMessage}>
                        Delete
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Confirm
                    </button>
                </div>
            </form>
        </section>
    )
}