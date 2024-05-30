import styles from "./ServerView.module.css"
import MessageLayout from "../MessageLayout/MessageLayout"

export default function ServerView(){
    return (
        <section className={styles.serverView}>
            <MessageLayout />
        </section>
    )
}