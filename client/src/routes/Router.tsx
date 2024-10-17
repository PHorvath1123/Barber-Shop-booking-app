import { createBrowserRouter } from "react-router-dom";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import App from "../App";
import Pricing from "../pages/Pricing";
import Policy from '../pages/Policy'

export const router = createBrowserRouter([
    {   path: '/',
        element: <App/>,        
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <div>404 Not Found</div>,
            },
            {
                path: '/appointment',
                element: <Booking/>,
                errorElement: <div>404 Not Found</div>
            },
            {
                path: '/pricing',
                element: <Pricing/>,
                errorElement: <div>404 Not Found</div>
            },
            {
                path: '/policy',
                element: <Policy/>,
                errorElement: <div>404 Not Found</div>
            },
        ],
    },
]);

