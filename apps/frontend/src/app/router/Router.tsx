import { createBrowserRouter, Outlet } from 'react-router-dom';
import Homepage from '../pages/homepage';
import PetDashboard from '../pages/homepage/pet-dashboard/PetDashboard';
import PetProfile from '../pages/pet-profile/PetProfile';

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
                path: '/pets/new',
                element: <PetProfile/>,
            },
            {
                path: '*',
                element: <>Not Found</>,
            },
        ],
    },
]);
