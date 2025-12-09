import { RouterProvider, Navigate } from 'react-router-dom'
import './css/App.css';
import { UserProvider, UserContext } from './context/userContext.jsx';
import { createBrowserRouter, useLoaderData } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import { useAuthHook } from "./hooks/useAuthHook.js";
import { useContext, useEffect } from 'react';

const AuthRedirector = ({ children }) => {
  const authed = useLoaderData();
  if (!authed) {
  
  }

  const { setUser } = useContext(UserContext);
  
  useEffect(() => {
    if (authed) {
      setUser(authed)
    }
  }, [authed, setUser])

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {

  const { checkAuth } = useAuthHook();

  return (
    <UserProvider>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <AuthRedirector><Home /></AuthRedirector>,
          loader: checkAuth, 
        },
        {
          path: "/login",
          element: <Login />,
        },
      ])} 
      />
    </UserProvider>
  )
}

export default App
