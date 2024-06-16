import styles from "./ChannelModal.module.css"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewChannel } from "../../redux/server";

function ChannelModal({ activeServerId, serverChannels }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newChannel = {
            name: channelName
        }

        const channelResponse = await dispatch(
            addNewChannel(newChannel, activeServerId)
        );

        console.log("CHANNEL RESPONSE", channelResponse)

        if (channelResponse) {
            setErrors(channelResponse);
        } else {
            closeModal()
        }


    }

    return (
        <section className={styles.modal}>
            <h1 className={styles.header}>Create a Channel</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Name
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.channelName && <p>{errors.channelName}</p>}
                <button type="submit" className={styles.button}>Create Channel</button>
            </form>
        </section>
    )
}

export default ChannelModal