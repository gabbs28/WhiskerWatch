import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/modules/Layout';
import Pets from '../pages/Pets/Pets';
import PetProfile from '../pages/PetProfile';
import PetDashboard from '../pages/PetDashboard';
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/',
                element: <PetDashboard />,
            },
            {
                path: '/',
                element: <Appointments />,
            },
            {
                path: '/pets',
                element: <Pets />,
                children: [
                    {
                        path: ':id',
                        element: <PetProfile />,
                    },
                ],
            },
            {
                path: '*',
                element: <>Not Found</>,
            },
        ],
    },
]);
