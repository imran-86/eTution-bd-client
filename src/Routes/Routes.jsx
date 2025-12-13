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
import AppliedTutors from "../Pages/Dashboard/Student/AppliedTutors";
import PaymentSuccess from "../Pages/Dashboard/Student/PaymentSuccess";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory";
import ProfileSettings from "../Pages/Dashboard/Student/ProfileSettings";
import ContactUs from "../Pages/ContactUs";


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
        },
        {
          path: 'contact-us',
          Component: ContactUs
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

      },
      {
        path: 'applied-tutors',
        Component: AppliedTutors
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'profile-settings',
        Component: ProfileSettings,
      }
    ]
  }
]);
export default router;