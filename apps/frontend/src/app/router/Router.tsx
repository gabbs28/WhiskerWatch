import { createBrowserRouter, Outlet } from 'react-router-dom';
import Homepage from '../pages/homepage';
import PetDashboard from '../pages/homepage/pet-dashboard/PetDashboard';

export const Router = createBrowserRouter([
    {
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/pets/:id',
                element: <PetDashboard/>,
            },
            {
                path: '*',
                element: <>Not Found</>,
            },
        ],
    },
]);
