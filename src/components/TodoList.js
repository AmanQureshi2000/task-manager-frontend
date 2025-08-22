import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCard from './TodoCard';

const TodoList = ({ token, userId }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [token, userId]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  if (loading) {
    return <div className="loading">Loading your tasks...</div>;
  }

  return (
    <div className="todo-container">
      {/* Statistics */}
      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTodos}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pendingTodos}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {todos.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Click "Add New" to create your first task!</p>
        </div>
      ) : (
        <div className="todo-grid">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;