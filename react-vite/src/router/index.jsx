import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ServerViewLayout from '../components/ServerViewLayout/ServerViewLayout';

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
    element: <h1>{"The page you're looking for is not in this castle."}</h1>
  }
]);