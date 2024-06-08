import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessageThunk, fetchChannelMessagesThunk } from '../../redux/message';
import styles from './MessageInput.module.css';

const MessageInput = ({ channelId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelMessagesThunk(channelId));
    }
  }, [dispatch, channelId]);

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (channelId && message.trim()) {
      dispatch(createMessageThunk(channelId, { text_field: message }));
      setMessage('');
    }
    dispatch(fetchChannelMessagesThunk(channelId))
  };

  const handleEditMessage = (messageId, newText) => {
    // Dispatch an action to edit the message
  };

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
            <button onClick={(e) => handleSendMessage(e)} className={styles.send_button}>
            Send
            </button>
      </form>
    </div>
  );
};

export default MessageInput;