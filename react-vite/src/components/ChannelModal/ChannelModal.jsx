import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewChannel } from "../../redux/server";

function ChannelModal({ activeServerId, serverChannels }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    console.log("CHECKING SERVER CHANNELS", serverChannels)

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
        <>
            <h1>Create a Channel</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                    />
                </label>
                {errors.channelName && <p>{errors.channelName}</p>}
                <button type="submit">Create Channel</button>
            </form>
        </>
    )
}

export default ChannelModal