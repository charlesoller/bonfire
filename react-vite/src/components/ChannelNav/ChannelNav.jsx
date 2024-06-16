import styles from "./ChannelNav.module.css"
// Util
import { useMemo } from "react"
// Components
import { FaCode } from "react-icons/fa"
import ChannelOption from "./components/ChannelOption"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import ChannelModal from "../ChannelModal/ChannelModal";
import { FaGear } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

export default function ChannelNav({ channels, setActiveChannelId, setPrevChannel, activeServer, currentUser, activeChannelId }){
    const channelElements = useMemo(() => channels.map(channel => (
        <div key={channel.id} className={styles.channelGroup}>
            <ChannelOption id={channel.id} key={channel.id} channel={channel} activeServer={activeServer} currentUser={currentUser} name={channel.name} activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} setPrevChannel={setPrevChannel} active={channel.id === activeChannelId} />
        </div>
    )), [channels, setActiveChannelId, setPrevChannel, activeServer, currentUser, activeChannelId])

    return (
        <aside className={styles.channelNav}>
            <div className={styles.channelName}>
                <div className={styles.channelName__left}>
                    <FaCode className={styles.channelName__logo}/>
                    <h1 className={styles.channelName__header}>{activeServer?.name || "Loading..."}</h1>
                </div>

                {activeServer?.owner_id === currentUser?.[0].id && <OpenModalButton
                    buttonText={<FaGear className={styles.button} />}
                    modalComponent={<NewServerModal server={activeServer} formType="Update Server"/>}
                />}
            </div>
            <div className={styles.channelOptions}>
                <OpenModalButton
                    buttonText={<span className={styles.addChannel}>Add Channel<GoPlus /></span>}
                    modalComponent={<ChannelModal serverChannels={channels} activeServerId={activeServer?.id}/>}
                />
                <div className={styles.channelElements}>
                    {channelElements}
                </div>
            </div>
        </aside>
    )
}