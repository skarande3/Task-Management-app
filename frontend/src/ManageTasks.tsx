import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageTasks: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const buttonStyle = {
    display: 'block',
    width: '300px',
    padding: '15px',
    margin: '10px auto',
    fontSize: '18px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
  };

  const logoutButtonStyle = {
    position: 'fixed' as const,
    right: '20px',
    bottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <h1>Welcome!</h1>
      <h2>Manage your Tasks:</h2>
      <button style={buttonStyle} onClick={() => handleNavigation('/create-task')}>Create a new task</button>
      <button style={buttonStyle} onClick={() => handleNavigation('/view-tasks')}>View a list of tasks</button>
      <button style={buttonStyle} onClick={() => handleNavigation('/update-task')}>Update an existing task</button>
      <button style={buttonStyle} onClick={() => handleNavigation('/delete-task')}>Delete a task</button>
      <button style={buttonStyle} onClick={() => handleNavigation('/completed-tasks')}>Completed tasks</button>
      <button
        onClick={handleLogout}
        style={logoutButtonStyle}
      >
        Logout
      </button>
    </div>
  );
};

export default ManageTasks;
