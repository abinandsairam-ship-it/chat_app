import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list-container">
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message-item ${
              message.user._id === currentUser.id ? 'own-message' : ''
            }`}
          >
            <div className="message-header">
              <strong className="message-username">
                {message.username}
              </strong>
              <small className="message-time text-muted">
                {formatTime(message.createdAt)}
              </small>
            </div>
            <div className="message-text">
              {message.text}
            </div>
          </div>
        ))}
        
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.map((user, index) => (
              <span key={index} className="typing-user">
                {user} is typing...
                {index < typingUsers.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;