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
import ManageTuition from "../Pages/Dashboard/Admin/ManageTuition";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import MyTuition from "../Pages/Dashboard/Student/ApprovedTuition";
import OngoingTuitions from "../Pages/Dashboard/Tutor/OngoingTuitions";


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
          path: 'all-tuitions',
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
      },
      {
        path: 'manage-tuition',
        Component: ManageTuition
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: 'approved-tuition',
        Component: MyTuition
      },
      {
        path: 'ongoing-tuitions',
        Component: OngoingTuitions

      }
    ]
  }
]);
export default router;