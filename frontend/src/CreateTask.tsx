import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!title.trim()) {
      setMessage('Task title is required.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setMessage('Task added successfully!');
        setTitle('');
        setDescription('');
      } else {
        setMessage('Failed to add task.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Error creating task.');
    }
  };

  const inputStyle = {
    width: '400px',
    padding: '10px',
    marginBottom: '15px',
    marginRight: '10px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Create a New Task</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <h3>New Task</h3>
          <input
            type="text"
            placeholder="Task Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Task Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', color: 'green' }}>
          Add Task
        </button>
      </form>
      <p>{message}</p>
      <button 
        onClick={() => navigate('/manage-tasks')} 
        style={{
          position: 'absolute', 
          right: '20px',
          backgroundColor: 'yellow',
          color: 'black',
          padding: '10px 15px',
          border: '1px solid black',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back
      </button>
    </div>
  );
};

export default CreateTask;
