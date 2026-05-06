import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './assets/css/index.css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/security/ProtectedRoute'
import App from './App'

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"

import UserArea from "./pages/UserArea/UserArea";

import ViewUser from "./pages/ViewUser/ViewUser";
import ViewPost from "./pages/ViewPost/ViewPost";
import EditPost from "./pages/EditPost/EditPost";
import DeletePost from "./pages/DeletePost";


let routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <App/> </ProtectedRoute>,
    children: [
      { index: true, path: "/:category?", element: <Home/> },
      { path: "/post/:id?",   element: <ViewPost/>    },
      { path: "/user/:id?",   element: <ViewUser/>    },
      { path: "/edit/:id?",   element: <EditPost/>    },
      { path: "/delete/:id?", element: <DeletePost/>  },
      { path: "/userarea",    element: <UserArea/>    }
  ]},

    { path: "/login", element: <Login/> },
    { path: "/register", element: <Register/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>,
)
