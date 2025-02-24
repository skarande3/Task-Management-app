import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const UpdateTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isComplete, setIsComplete] = useState('no');
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

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalTitle.trim()) {
      setMessage('Original task title is required.');
      return;
    }

    const matchedTask = tasks.find(
      (task) => task.title === originalTitle && task.description === originalDescription
    );

    if (!matchedTask) {
      setMessage('No task found with the given title and description.');
      return;
    }

    const isCompleteBoolean = isComplete === 'yes';

    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/tasks/${matchedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle || matchedTask.title,
          description: newDescription || matchedTask.description,
          iscomplete: isCompleteBoolean,
        }),
      });
      setMessage('Task updated successfully!');
      setOriginalTitle('');
      setOriginalDescription('');
      setNewTitle('');
      setNewDescription('');
      setIsComplete('no');
    } catch (error) {
      console.error('Failed to update task:', error);
      setMessage('Error updating task.');
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
      <h2>Update an Existing Task</h2>
      <form onSubmit={handleUpdateTask}>
        <div>
          <h3>Original Task</h3>
          <input
            type="text"
            placeholder="Original Task Title (required)"
            value={originalTitle}
            onChange={(e) => setOriginalTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Original Task Description"
            value={originalDescription}
            onChange={(e) => setOriginalDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <h3>Updated Task</h3>
          <input
            type="text"
            placeholder="Updated Task Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Updated Task Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            style={inputStyle}
          />
          <select
            value={isComplete}
            onChange={(e) => setIsComplete(e.target.value)}
            style={{ width: '200px', padding: '10px' }}
          >
            <option value="no">Incomplete</option>
            <option value="yes">Complete</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', color: 'darkorange' }}>
          Update Task
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

export default UpdateTask;
