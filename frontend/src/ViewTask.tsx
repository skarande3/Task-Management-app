import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>List of All Tasks</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid black' }}>Title</th>
            <th style={{ padding: '10px', borderBottom: '1px solid black' }}>Description</th>
            <th style={{ padding: '10px', borderBottom: '1px solid black' }}>Is it Complete?</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ padding: '10px' }}>{task.title}</td>
              <td style={{ padding: '10px' }}>{task.description || '----'}</td>
              <td style={{ 
    padding: '10px', 
    color: task.iscomplete ? 'green' : 'red',
    fontWeight: 'bold' 
  }}
>
  {task.iscomplete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ViewTasks;
