import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeSocket, getSocket, disconnectSocket } from '../utils/socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = ({ user, token, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = initializeSocket(token);
    setSocket(socketInstance);

    // Load previous messages
    const loadMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Socket event listeners
    socketInstance.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketInstance.on('userTyping', (data) => {
      setTypingUsers(prev => {
        if (data.isTyping) {
          return [...prev.filter(u => u !== data.username), data.username];
        } else {
          return prev.filter(u => u !== data.username);
        }
      });
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [token]);

  const handleSendMessage = (text) => {
    if (socket) {
      socket.emit('sendMessage', {
        userId: user.id,
        username: user.username,
        text: text
      });
    }
  };

  const handleLogout = () => {
    disconnectSocket();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header bg-primary text-white p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">Global Chat</h4>
              <small>Welcome, {user.username}!</small>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-body">
        <MessageList
          messages={messages}
          currentUser={user}
          typingUsers={typingUsers}
        />
      </div>

      <div className="chat-footer">
        <MessageInput
          onSendMessage={handleSendMessage}
          currentUser={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Chat;