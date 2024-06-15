import styles from "./Message.module.css"
import { formatDate } from "./utils/utils"
// Components
import { MdEdit } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditMessageModal from "./components/EditMessageModal/EditMessageModal";

export default function Message({id, text, date, name, channelId, img = "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"}){
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
                        />
                        <OpenModalButton 
                            buttonText={<MdEdit className={styles.button} />}
                            modalComponent={<EditMessageModal id={id} message={text} channelId={channelId} />}
                        />
                    </div>
                </div>
                <p className={styles.textBody}>{text}</p>
            </div>
        </article>
    )
}