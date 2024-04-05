import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Events from "../Pages/Events/Events";
import Settings from "../Pages/Settings/Settings";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'events',
                element: <Events />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'login',
                element: <Login />,
            },

        ]
    }
])