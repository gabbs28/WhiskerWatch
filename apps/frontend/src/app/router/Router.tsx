import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/modules/Layout';
import Dashboard from '../components/modules/Dashboard/Dashboard';
import Pets from '../pages/Pets/Pets';
import PetProfile from '../pages/PetProfile';

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
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
