import React, { useEffect, useState } from 'react';

import TaskForm from './TaskForm';
import TaskList from './TaskList';

interface Task {
  id: number;
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });
      setMessage('Task created!');
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Task deleted!');
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  

useEffect(() => {
  fetchTasks();
}, [fetchTasks]);  

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  return (
    <div>
      <h2>Task Management</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskForm onSubmit={handleCreateTask} />
      <p>{message}</p>
      <h3>Tasks List</h3>
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
};

export default Tasks;
