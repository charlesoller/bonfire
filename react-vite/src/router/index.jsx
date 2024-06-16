import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ServerViewLayout from '../components/ServerViewLayout/ServerViewLayout';
import DeadLinkPage from '../components/DeadLinkPage/DeadLink';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ServerViewLayout />,
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  },
  {
    path: "*",
    element: <DeadLinkPage/>
  }
]);