import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessageThunk, fetchChannelMessagesThunk } from '../../redux/message';
import styles from './MessageInput.module.css';

const MessageInput = ({ channelId, handleSendMessage }) => {
  const [message, setMessage] = useState('');
  const sendMessage = (e, message) => {
    handleSendMessage(e, message)
    setMessage("")
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.message_input_container}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.message_input}
                placeholder="Type a message..."
            />
            <button onClick={(e) => sendMessage(e, message)} className={styles.send_button} disabled={message.length < 1}>
                Send
            </button>
      </form>
    </div>
  );
};

export default MessageInput;