import React, { useState, useEffect } from 'react';

const MessageInput = ({ onSendMessage, currentUser, socket }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      stopTyping();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { 
        username: currentUser.username, 
        isTyping: true 
      });
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(stopTyping, 1000);
  };

  const stopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      socket.emit('typing', { 
        username: currentUser.username, 
        isTyping: false 
      });
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
      stopTyping();
    };
  }, []);

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
            maxLength="500"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;