import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoModal = ({ token, todo, onClose, onUpdate, mode = "create" }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || ''
      });
    }
  }, [mode, todo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    token = localStorage.getItem('token');

    try {
      if (mode === "create") {
        await axios.post(
          'https://task-manager-backend-3cnj.onrender.com/api/todos',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else if (mode === "edit") {
        await axios.put(
          `https://task-manager-backend-3cnj.onrender.com/api/todos/${todo.id}`,
           {
            title: formData.title || todo.title,
            description: formData.description || todo.description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
      
      onClose(); // Close the modal on success
      window.location.reload(); // Refresh to show updated list
    } catch (err) {
        setError(err.response?.data?.error || `Failed to ${mode} task`);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "create" ? "Add New Task" : "Edit Task"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="What needs to be done?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows="4"
                placeholder="Add more details about this task..."
              />
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : (mode === "create" ? 'Add Task' : 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;