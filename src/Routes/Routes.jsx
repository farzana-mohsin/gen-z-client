import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Components/About";
import Register from "../Components/Register";
import Login from "../Components/Login";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <App></App>
      </PrivateRoutes>
    ),
    loader: () => fetch(`${import.meta.env.VITE_API_URL}/products`),
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
