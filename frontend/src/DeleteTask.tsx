import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

interface Task {
  id: number;
  title: string;
  description: string;
}

const DeleteTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleDeleteTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage('Task title is required.');
      return;
    }

    const matchedTask = tasks.find(
      (task) => task.title === title && task.description === description
    );

    if (!matchedTask) {
      setMessage('No task found with the given title and description.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/tasks/${matchedTask.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Task deleted successfully!');
      setTitle('');
      setDescription('');
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Failed to delete task:', error);
      setMessage('Error deleting task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const inputStyle = {
    width: '400px',
    padding: '10px',
    marginBottom: '15px',
    marginRight: '10px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Delete a Task</h2>
      <form onSubmit={handleDeleteTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px',  color: 'red', }}>
          Delete Task
        </button>
        </div>
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

export default DeleteTask;
