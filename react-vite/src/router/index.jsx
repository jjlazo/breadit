import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home';
import { Subbreadit, SubbreaditToast }  from '../components/Subbreadit';
import Toasts from '../components/Toasts';
import NotFound from '../components/NotFound';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/subbreadit/:subbreaditId",
        element: <Subbreadit/>
      },
      {
        path: "/subbreadit/:subbreaditId/toast/:toastId",
        element: <SubbreaditToast/>
      },
      {
        path: "/toasts/:userId",
        element: <Toasts/>
      },
      {
        path: "/u/toasts/:userId",
        element: <Toasts/>
      },
      {
        path: "/error",
        element: <NotFound/>
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ],
  },
]);