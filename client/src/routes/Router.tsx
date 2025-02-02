import { createBrowserRouter } from "react-router-dom";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import App from "../App";
import Pricing from "../pages/Pricing";
import Policy from "../pages/Policy";
import SignIn from "../admin/pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../admin/pages/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/appointment",
        element: <Booking />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/pricing",
        element: <Pricing />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/policy",
        element: <Policy />,
        errorElement: <div>404 Not Found</div>,
      },

      //Admin Routes
      {
        path: "/admin/signin",
        element: <SignIn />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
