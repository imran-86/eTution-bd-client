import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Tuitions from "../Pages/Tuitions";
import Tutors from "../Pages/Tutors";
import AboutUs from "../Pages/AboutUs";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import PostTuition from "../Pages/Dashboard/Student/PostTuition";


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
  {
    path: 'dashboard',
    Component: DashBoardLayout,
    children: [
      {
        path:'post-tuition',
        Component: PostTuition
      }
    ]
  }
]);
export default router;