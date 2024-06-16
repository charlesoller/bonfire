import styles from "./Message.module.css"
import { formatDate } from "./utils/utils"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
// Components
import { MdEdit } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditMessageModal from "./components/EditMessageModal/EditMessageModal";
import ReactionModal from "./components/ReactionModal/ReactionModal";
import { deleteReaction, incrementReaction } from "../../utils/api";
import { fetchAllMessagesThunk } from "../../redux/message";
import { socket } from "../../socket";

export default function Message({id, text, date, name, channelId, reactions, currentUser, img = "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"}){
    const dispatch = useDispatch()

    const reactionElements = useMemo(() => reactions.map((reaction) => {
        const handleReaction = (reactionId, hasReacted) => {
            if (hasReacted) {
                deleteReaction(reactionId)
            } else {
                incrementReaction(reactionId)
            }
            socket.emit('chat', { room: channelId });
            dispatch(fetchAllMessagesThunk())
        }
        const userIds = reaction.user_reactions?.map(join => join.user_id);
        const hasReacted = userIds.includes(currentUser.id)
        return <button 
            key={reaction.id} 
            className={`${styles.reactionButton} ${hasReacted ? styles.selected : undefined}`} 
            onClick={() => handleReaction(reaction.id, hasReacted)}>
                {reaction.emoji} {reaction.count}
            </button>
    }), [reactions, currentUser.id, dispatch, channelId])

    return (
        <article className={styles.message}>
            <img className={styles.profile_picture} src={img} />
            <div className={styles.rightSide}>
                <div className={styles.userDetails}>
                    <h5 className={styles.userName}>{name}</h5>
                    <p className={styles.date}>{formatDate(date)}</p>
                    <div className={styles.buttons}>
                        <OpenModalButton 
                            buttonText={<MdEmojiEmotions className={styles.button} />}
                            modalComponent={<ReactionModal id={id} channelId={channelId} currentUser={currentUser} reactions={reactions} />}
                        />
                        <OpenModalButton 
                            buttonText={<MdEdit className={styles.button} />}
                            modalComponent={<EditMessageModal id={id} message={text} channelId={channelId} />}
                        />
                    </div>
                </div>
                <p className={styles.textBody}>{text}</p>
                <div className={styles.reactions}>
                    { reactionElements }
                </div>
            </div>
        </article>
    )
}