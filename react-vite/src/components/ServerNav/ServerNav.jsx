import { useMemo } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import styles from "./ServerNav.module.css"
import ServerIcon from "./components/ServerIcon";
// import { FaUserCircle } from "react-icons/fa"
// import { FaFireAlt, FaFire } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { MdEmojiEmotions } from "react-icons/md";

const IMAGE_PLACEHOLDER = "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"

export default function ServerNav({ servers, activeServerId, setActiveServerId, activeChannelId, setActiveChannelId, setPrevChannelId }){

    const serverElements = useMemo(() => servers.map((server) => {
        return (
            <ServerIcon key={server.id} image={server.server_images[0]?.url || IMAGE_PLACEHOLDER} id={server.id} servers={servers} setActiveServerId={setActiveServerId} activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} setPrevChannelId={setPrevChannelId} isActive={server.id === activeServerId}/>
        )
    }), [servers, setActiveServerId, activeChannelId, setPrevChannelId, setActiveChannelId, activeServerId])

    return (
        <aside className={styles.serverNav}>
            <div className={styles.directMessageIcon}>
                <AiFillFire size={40} fill="orange"/>
            </div>
            {serverElements}

            <OpenModalButton
                buttonText={<CiCirclePlus size={40} className={styles.button} />}
                modalComponent={<NewServerModal/>}
            />
        </aside>
    )
}