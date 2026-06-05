import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import MeshBackground from './lib/MeshBackground.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import UnauthLayout from './layouts/UnauthLayout.jsx';
import Dashboard from './surfaces/Dashboard.jsx';
import DashboardUnauth from './surfaces/DashboardUnauth.jsx';
import Home from './surfaces/Home.jsx';
import Onboarding from './surfaces/Onboarding.jsx';
import OrganizationsUnauth from './surfaces/OrganizationsUnauth.jsx';
import Partner from './surfaces/Partner.jsx';
import ShadcnDemo from './surfaces/ShadcnDemo.jsx';

// Layout routes keep the top nav mounted across child navigations: only the
// <Outlet/> content swaps, so moving between sibling surfaces never reloads
// the page or remounts the nav. Crossing the auth boundary swaps the layout.
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      {
        path: '/partner',
        element: <Partner />,
        // Partner runs a lighter type scale than the other authenticated
        // surfaces. (The mesh shows through by default — see .app in styles.css.)
        handle: { appStyle: { fontSize: '14px', fontWeight: 200 } },
      },
    ],
  },
  {
    element: <UnauthLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/dashboard-unauth', element: <DashboardUnauth /> },
      { path: '/organizations', element: <OrganizationsUnauth /> },
    ],
  },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/shadcn-demo', element: <ShadcnDemo /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Mounted once: the renderer prepends its own fixed canvas to <body>. */}
    <MeshBackground />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
