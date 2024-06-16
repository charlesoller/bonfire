import { useEffect, useMemo } from "react";
import { useDispatch } from 'react-redux';
import { fetchAllServersThunk, clearServerDetails } from '../../redux/server';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import styles from "./ServerNav.module.css"
import ServerIcon from "./components/ServerIcon";
// import { FaUserCircle } from "react-icons/fa"
// import { FaFireAlt, FaFire } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";

// const IMAGE_PLACEHOLDER = "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"

export default function ServerNav({ servers, setActiveServerId, activeChannelId, setActiveChannelId, setPrevChannelId }){

    const serverElements = useMemo(() => servers.map((server) => {
        return (
            <ServerIcon key={server.id} image={server.server_images[0].url} id={server.id} servers={servers} setActiveServerId={setActiveServerId} activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} setPrevChannelId={setPrevChannelId} />
        )
    }), [servers, setActiveServerId, activeChannelId, setPrevChannelId, setActiveChannelId])

    return (
        <aside className={styles.serverNav}>
            <div className={styles.directMessageIcon}>
                <AiFillFire size={40} fill="orange"/>
            </div>
            {serverElements}

            <OpenModalButton
                buttonText={<CiCirclePlus size={44}/>}
                modalComponent={<NewServerModal/>}
            />
        </aside>
    )
}