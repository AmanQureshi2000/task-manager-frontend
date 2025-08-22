import React, { useState } from 'react';
import TodoModal from './TodoModal';

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleComplete = () => {
    onUpdate(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    
    const datePart = date.toLocaleDateString(undefined, dateOptions);
    const timePart = date.toLocaleTimeString(undefined, timeOptions);
    
    return `${datePart} ${timePart}`;
};

  return (
    <>
      <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
        <div className="todo-header">
          <div>
            <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </div>
            <div className="todo-date">
              Created: {formatDate(todo.created_at)}
            </div>
          </div>
        </div>
        
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
        
        <div className="todo-actions">
          <button 
            onClick={handleComplete} 
            className="complete-btn"
            title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.completed ? '✓' : '○'}
          </button>
          <button 
            onClick={() => setShowEditModal(true)} 
            className="edit-btn"
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-btn"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {showEditModal && (
        <TodoModal 
          token={todo.token}
          todo={todo}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate}
          mode="edit"
        />
      )}
    </>
  );
};

export default TodoCard;