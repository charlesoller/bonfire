import styles from "./ChannelOption.module.css"
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { FaGear } from "react-icons/fa6";
import EditChannelModal from "../../EditChannelModal/EditChannelModal";

export default function ChannelOption({id, name, channel, activeServer, currentUser, activeChannelId, setActiveChannelId, setPrevChannel, active}){
    const activeStyle = active ? {"background": "#37393f"} : {}
    const handleChangeChannel = () => {
        setPrevChannel(activeChannelId);
        setActiveChannelId(id);
    }

    return (
        <div className={styles.container} onClick={handleChangeChannel} style={activeStyle}>
            <h1 className={styles.text}>{name.toLowerCase()}</h1>
            {(channel.owner_id === currentUser[0].id || activeServer?.owner_id === currentUser[0]?.id) && <OpenModalButton
                buttonText={<FaGear />}
                modalComponent={<EditChannelModal channel={channel}/>}
            />}
        </div>
    )
}