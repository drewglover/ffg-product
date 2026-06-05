import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MeshBackground from './lib/MeshBackground.jsx';
import Dashboard from './surfaces/Dashboard.jsx';
import Onboarding from './surfaces/Onboarding.jsx';
import Partner from './surfaces/Partner.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/partner', element: <Partner /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Mounted once: the renderer prepends its own fixed canvas to <body>. */}
    <MeshBackground />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
