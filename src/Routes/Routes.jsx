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
import ReportAnalytics from "../Pages/Dashboard/Admin/ReportAnalytics";
import PrivateRoute from "./PrivateRoute";
import RevenueHistory from "../Pages/Dashboard/Tutor/RevenueHistory";
import TuitionDetails from "../Pages/TuitionDetails";
import MyApplications from "../Pages/Dashboard/Tutor/MyApplications";
import ErrorPage from "../Components/ErrorPage";


const  router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
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
        },
        {
          path: 'tuition-details/:id',
          Component: TuitionDetails
        },
        {
          path: 'all-tuitions/tuition-details/:id',
          Component: TuitionDetails
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    // Component: DashBoardLayout,
    children: [
      {
        path:'post-tuition',
        element: <PrivateRoute><PostTuition></PostTuition></PrivateRoute>
      },
      {
        path: 'manage-tuition',
        element: <PrivateRoute><ManageTuition></ManageTuition></PrivateRoute>
       
      },
      {
        path: "manage-users",
        element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
       
      },
      {
        path: 'approved-tuition',
        element: <PrivateRoute><MyTuition></MyTuition></PrivateRoute>
        
      },
      {
        path: 'ongoing-tuitions',
        element: <PrivateRoute><OngoingTuitions></OngoingTuitions></PrivateRoute>
       
      },
      {
        path: 'applied-tutors',
        element: <PrivateRoute><AppliedTutors></AppliedTutors></PrivateRoute>
        
      },
      {
        path: 'payment-success',
        element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
       
      },
      {
        path: 'payment-history',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        
      },
      {
        path: 'profile-settings',
        element: <PrivateRoute><ProfileSettings></ProfileSettings></PrivateRoute>
      
      },
      {
        path: 'reports-analytics',
        element: <PrivateRoute><ReportAnalytics></ReportAnalytics></PrivateRoute>
       
      },
      {
        path: 'revenue-history',
        element: <PrivateRoute><RevenueHistory></RevenueHistory></PrivateRoute>
      },
      {
        path: 'my-applications',
        element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
      }
    ]
  }
]);
export default router;