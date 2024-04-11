import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import Home from '../Pages/Home/Home'
import Events from '../Pages/Events/Events'
import Settings from '../Pages/Settings/Settings'
import Login from '../Pages/Login/Login'
import Profile from '../Pages/Profile/Profile'
import EventDetails from '../Components/EventDetails/EventDetails'
import FormEvent from '../Pages/FormEvents/FormEvent'
import Materials from '../Components/Materials/Materials'
import SettingsLayout from '../Layouts/SettingsLayout'
import EventsAdmin from '../Components/EventsAdmin/EventsAdmin'
import { redirect } from 'react-router-dom'

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
        path: 'events/:eventId',
        element: <EventDetails />,
      },
      {
        path: 'settings',
        element: <SettingsLayout />,
        loader: () => {
          if (localStorage.getItem('role') === 'admin') {
            return null
          } else {
            return redirect('/')
          }
        },
        children: [
          { path: '', element: <Settings /> },
          { path: 'materials', element: <Materials /> },
          { path: 'events', element: <EventsAdmin /> },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: () => {
          if (localStorage.getItem('token')) {
            return null
          } else {
            return redirect('/')
          }
        },
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'form-event',
        element: <FormEvent />,
        loader: () => {
          if (localStorage.getItem('token')) {
            return null
          } else {
            return redirect('/')
          }
        },
      },
      {
        path: 'form-event/:eventId',
        element: <FormEvent />,
        loader: () => {
          if (localStorage.getItem('token')) {
            return null
          } else {
            return redirect('/')
          }
        },
      },
    ],
  },
])
