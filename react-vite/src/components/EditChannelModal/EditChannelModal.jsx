import styles from "./EditChannelModal.module.css"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOldChannel, deleteAChannel } from "../../redux/server";

function EditChannelModal({ channel }) {
    const dispatch = useDispatch();
    const { name } = channel
    const [channelName, setChannelName] = useState(name);
    const [channelNameError, setChannelNameError] = useState({})
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (channelName === 'general') {
            setChannelNameError({channelName: "Cannot name your channel general."})
            return;
        }

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
                {channelNameError.channelName && <p>{channelNameError.channelName}</p>}
                {errors.error && <p>Only the channel owner may update or delete the channel.</p>}
                <div className={styles.buttons}>
                    <button type="submit" className={styles.createButton}>Update Channel</button>
                    <button onClick={deleteChannel} className={styles.deleteButton}>Delete Channel</button>
                </div>
            </form>
        </section>
    )
}

export default EditChannelModal;