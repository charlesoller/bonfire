import styles from "./ChannelNav.module.css"
// Util
import { useMemo } from "react"
// Components
import { FaCode } from "react-icons/fa"
import ChannelOption from "./components/ChannelOption"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import ChannelModal from "../ChannelModal/ChannelModal";
import EditChannelModal from "../EditChannelModal/EditChannelModal";
import { FaGear } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";


export default function ChannelNav({ channels, setActiveChannelId, setPrevChannel, activeServer, currentUser, activeChannelId }){
    const channelElements = useMemo(() => channels.map(channel => (
        <div key={channel.id}>
            {console.log("CHANNEL LIST", channel)}
            <ChannelOption id={channel.id} name={channel.name} activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} setPrevChannel={setPrevChannel} active={channel.id === activeChannelId}/>
            {/* {(channel.owner_id === currentUser[0].id || activeServer?.owner_id === currentUser[0]?.id) && <OpenModalButton
                buttonText={<FaGear />}
                modalComponent={<EditChannelModal activeServerId={activeServer?.id} channel={channel}/>}
            />} */}
        </div>
    )), [channels, activeChannelId, setActiveChannelId, setPrevChannel, activeServer?.id, activeServer?.owner_id, currentUser])

    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <FaCode className={styles.channelName__logo}/>
                <h1 className={styles.channelName__header}>{activeServer?.name || "Loading..."}</h1>
                <OpenModalButton
                    buttonText={<FaGear />}
                    modalComponent={<NewServerModal server={activeServer} formType="Update Server"/>}
                />
            </div>
            <div>
                Text Channels
                <OpenModalButton
                    buttonText={<GoPlus />}
                    modalComponent={<ChannelModal
                                        serverChannels={channels}
                                        activeServerId={activeServer?.id}/>}
                                    />
            </div>
            <div className={styles.channelOptions}>
                {channelElements}
            </div>
        </aside>
    )
}