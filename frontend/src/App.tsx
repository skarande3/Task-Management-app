import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './login';
import Tasks from './Tasks';
import ManageTasks from './ManageTasks';
import CreateTask from './CreateTask';
import ViewTasks from './ViewTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import CompletedTasks from './CompletedTasks';





const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/tasks" : "/login"} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manage-tasks" element={token ? <ManageTasks /> : <Navigate to="/login" />} />
      <Route path="/create-task" element={token ? <CreateTask /> : <Navigate to="/login" />} />
      <Route path="/view-tasks" element={token ? <ViewTasks /> : <Navigate to="/login" />} />
      <Route path="/update-task" element={token ? <UpdateTask /> : <Navigate to="/login" />} />
      <Route path="/delete-task" element={token ? <DeleteTask /> : <Navigate to="/login" />} />
      <Route path="/completed-tasks" element={token ? <CompletedTasks /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
