import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/homepage';

export const Router = createBrowserRouter([
    {
        element: <Homepage />,
        children: [
            {
                path: '/',
                element: <></>,
            },
            {
                path: '*',
                element: <>Not Found</>,
            },
        ],
    },
]);
