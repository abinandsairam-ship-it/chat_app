import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setCurrentView('chat');
    }
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setCurrentView('chat');
  };

  const handleRegister = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setCurrentView('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCurrentView('login');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="App">
      {currentView === 'login' && (
        <Login
          onLogin={handleLogin}
          switchToRegister={switchToRegister}
        />
      )}
      
      {currentView === 'register' && (
        <Register
          onRegister={handleRegister}
          switchToLogin={switchToLogin}
        />
      )}
      
      {currentView === 'chat' && user && token && (
        <Chat
          user={user}
          token={token}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;