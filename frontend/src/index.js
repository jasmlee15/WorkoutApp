import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { RoutinesContextProvider } from './context/RoutinesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoutinesContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
      </RoutinesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);