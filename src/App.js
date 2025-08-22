import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import TodoModal from './components/TodoModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setUser(userInfo);
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!user) {
    return (
      <div className="app">
        {showLogin ? (
          <Login onLogin={handleLogin} toggleForm={toggleForm} />
        ) : (
          <Register onLogin={handleLogin} toggleForm={toggleForm} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tasks Manager</h1>
        <div className="header-actions">
          <button onClick={openModal} className="add-new-btn">
            <span className="plus-icon">+</span> Add New
          </button>
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>
      
      <TodoList token={token} userId={user.id} />
      
      {showModal && (
        <TodoModal 
          token={token} 
          onClose={closeModal} 
          mode="create"
        />
      )}
    </div>
  );
}

export default App;