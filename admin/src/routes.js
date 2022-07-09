import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Info from './pages/Info';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'products/info', element: <Info /> },
        { path: 'suggest', element: <Register /> },
        { path: 'report', element: <NotFound /> }
      ]
    },
    {
      path: '/',
      // element: <LogoOnlyLayout />,
      element: <DashboardLayout />,
      children: [
        { path: 'login', element: <Login /> },

        { path: '/', element: <Navigate to="/dashboard/app" /> }
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    }
    // { path: '*', element: <Navigate to="/dashboard/app" replace /> }
  ]);
}
