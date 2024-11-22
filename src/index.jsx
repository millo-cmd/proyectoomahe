import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './components/Login';
import Organization from './components/Organization';
import PrivateRoute from './routes/auth'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App(){
  const [isAuthenticated, setIsAuthenticated ] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Login setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "/login",
          element: <Login setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "/organization",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<Organization />}
            />
          ),
        },
      ])}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
