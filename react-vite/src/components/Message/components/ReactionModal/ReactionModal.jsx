import styles from "./ReactionModal.module.css"
import { useDispatch } from "react-redux"
import { socket } from "../../../../socket";

import { useModal } from "../../../../context/Modal";
import { addMessageReaction, deleteReaction, incrementReaction } from "../../../../utils/api";
import { fetchAllMessagesThunk } from "../../../../redux/message";

const REACTIONS = ['😂', '😭', '😄']

// reactions is, in this case, only the reactions for a single message
export default function ReactionModal({ id, channelId, currentUser, reactions }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleAddReaction = async (reaction) => {
        const found = reactions.find(existing => existing.emoji === reaction);
        if (found) {
            const userIds = found.user_reactions?.map(user => user.user_id)
            if (userIds.includes(currentUser.id)) {
                await deleteReaction(found.id)
            } else {
                await incrementReaction(found.id)
            }
        } else {
            await addMessageReaction(id, reaction, currentUser.id);
        }

        socket.emit('chat', { room: channelId });
        dispatch(fetchAllMessagesThunk())
        closeModal();
    }

    const reactionElements = REACTIONS.map(reaction => (
        <button key={reaction} className={styles.reactionButton} onClick={() => handleAddReaction(reaction)}>{reaction}</button>
    ))

    return (
        <section className={styles.modal}>
            <div className={styles.buttons}>
                {reactionElements}
            </div>
        </section>
    )
}