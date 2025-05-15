import './app.module.css';
import { RouterProvider } from 'react-router-dom';
import { Router as router } from './router/Router';
import React from 'react';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
