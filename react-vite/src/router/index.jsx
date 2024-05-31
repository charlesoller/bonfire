import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ServerViewLayout from '../components/ServerViewLayout/ServerViewLayout';
import ServerView from '../components/ServerView/ServerView';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ServerViewLayout />,
    children: [
      {
        path: "/",
        element: <ServerView />
      }
    ]
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  },
]);