import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import FriendProfilePage from './pages/FriendProfilePage.jsx';
import DashboardPage from './pages/DashBoardPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import UsersListPage from './pages/UsersListPage';
import ProfilePage from './pages/ProfilePage.jsx';
import EditProfile from './pages/EditProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: 'user/:userID',
        element: <FriendProfilePage />,
      },
      {
        path: 'chat/:chatID',
        element: <ChatPage />,
      },
      {
        path: 'users',
        element: <UsersListPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      },
      {
        path: 'profile/edit',
        element: <EditProfile/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
