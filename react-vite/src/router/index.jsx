import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ServerViewLayout from '../components/ServerViewLayout/ServerViewLayout';
import DeadLinkPage from '../components/DeadLinkPage/DeadLink';
import Splash from '../components/Splasher/SplashPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/home",
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