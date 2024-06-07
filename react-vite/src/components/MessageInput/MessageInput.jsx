import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessageThunk, fetchChannelMessagesThunk } from '../../redux/message';
import Message from '../Message/Message';
import styles from './MessageInput.module.css';

const MessageInput = ({ channelId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages[channelId] || []);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelMessagesThunk(channelId));
    }
  }, [dispatch, channelId]);

  const handleSendMessage = () => {
    if (channelId && message.trim()) {
      dispatch(createMessageThunk(channelId, { text_field: message }));
      setMessage('');
    }
  };

  const handleEditMessage = (messageId, newText) => {
    // Dispatch an action to edit the message
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.message_input_container}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.message_input}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className={styles.send_button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;