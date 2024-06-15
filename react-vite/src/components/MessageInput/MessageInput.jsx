import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessageThunk } from '../../redux/message';
import { socket } from '../../socket';
import styles from './MessageInput.module.css';

const MessageInput = ({ channelId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const currentUser = Object.values(useSelector((state) => state.currentUser))[0];

  const handleSendMessage = (e, text_field) => {
    e.preventDefault()
    dispatch(createMessageThunk(channelId, text_field, currentUser.id))
    socket.emit('chat', { text_field, room: channelId, user: currentUser, date: new Date() });
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
            <button onClick={(e) => handleSendMessage(e, message)} className={styles.send_button} disabled={message.length < 1}>
                Send
            </button>
      </form>
    </div>
  );
};

export default MessageInput;