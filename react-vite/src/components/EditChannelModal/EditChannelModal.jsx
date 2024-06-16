import styles from "./EditChannelModal.module.css"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOldChannel, deleteAChannel } from "../../redux/server";

function EditChannelModal({ channel }) {
    const dispatch = useDispatch();
    const { name } = channel
    const [channelName, setChannelName] = useState(name);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        channel.name = channelName

        const channelResponse = await dispatch(
            updateOldChannel(channel)
        );

        if (channelResponse) {
            setErrors(channelResponse);
        } else {
            closeModal()
        }

    }

    const deleteChannel = async (e) => {
        e.preventDefault();

        const channelResponse = await dispatch(deleteAChannel(channel.id));

        if (channelResponse) {
            setErrors(channelResponse);
        } else {
            closeModal();
        }

    }

    return (
        <section className={styles.modal}>
            <h1 className={styles.header}>Channel Settings</h1>
            <form onSubmit={handleSubmit} className={styles.form} >
                <label>
                    Change Channel Name
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.createButton}>Create Channel</button>
                    <button onClick={deleteChannel} className={styles.deleteButton}>Delete Channel</button>
                </div>
            </form>
            {errors.error && <p>Only the channel owner may update or delete the channel.</p>}
        </section>
    )
}

export default EditChannelModal;