import styles from "./MessageLayout.module.css"
import Message from "../Message/Message"

export default function MessageLayout(){
    return (
        <div className={styles.main}>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}