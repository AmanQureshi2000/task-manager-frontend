import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleComplete = () => {
    onUpdate(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(todo.id, {
        ...todo,
        title: editTitle,
        description: editDescription
      });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <div className="todo-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="todo-input"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="todo-input"
              rows="2"
            />
          </>
        ) : (
          <>
            <div className="todo-title">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleComplete}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
              </span>
            </div>
            {todo.description && (
              <div className="todo-description">{todo.description}</div>
            )}
          </>
        )}
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="edit-btn">Save</button>
            <button onClick={handleCancel} className="delete-btn">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleComplete} className="complete-btn">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={handleEdit} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;