import { createBrowserRouter } from "react-router-dom";
import Appointment from "../pages/Appointment";
import Home from "../pages/Home";
import App from "../App";
import Pricing from "../pages/Pricing";

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
                element: <Appointment/>,
                errorElement: <div>404 Not Found</div>
            },
            {
                path: '/pricing',
                element: <Pricing/>,
                
            },
        ],
    },
]);

