import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Tuitions from "../Pages/Tuitions";
import Tutors from "../Pages/Tutors";
import AboutUs from "../Pages/AboutUs";


const  router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    children: [
        {
            index:true,
            Component: Home
        },
        {
          path: 'login',
          Component: Login

        },
        {
          path: 'register',
          Component: Register
        },
        {
          path: 'tuitions',
          Component: Tuitions
        },
        {
          path: 'tutors',
          Component: Tutors
        },
        {
          path: 'about',
          Component: AboutUs
        }
    ]
  },
]);
export default router;