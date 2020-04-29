/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/Register.js";
import AdminLogin from "views/AdminLogin";
import ContactUs from "views/ContactUs";
import Tables from "views/Tables";
import About from "views/About";
import PendingRequests from "views/pendingRequests";
import UnverifiedRequests from "views/UnverifiedRequests";
import InProgressRequests from "views/InProgressRequests";
import VerifyRequest from "views/verifyRequest";
import MapView from "./views/MapView";
import Instagram from "views/Instagram";
import UsefulLinks from "./views/UsefulLinks";
import VolunteerLogin from 'views/VolunteerLogin';
import RequestAcceptance from "views/RequestAccentance";
import TaskBoard from "views/TaskBoard";
import TaskStatusUpdate from 'views/TaskStatusUpdate';

const routes = [
  {
    path: "/mapview",
    name: "Map View",
    component: MapView
  },
  {
    path: "/admin-login",
    name: "Login",
    component: AdminLogin
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/contact-us",
    name: "Contact Us",
    component: ContactUs
  },
  {
    path: "/pending-requests",
    name: "Pending Requests",
    component: PendingRequests
  },
  {
    path: "/unverified-requests",
    name: "Pending Requests",
    component: UnverifiedRequests
  },
  {
    path: "/in-progress-requests",
    name: "In-progress Requests",
    component: InProgressRequests
  },
  {
    path: "/verify/:uuid",
    name: "Veify Request",
    component: VerifyRequest
  },
  {
    path: "/accept/:uuid",
    name: "Accept Request",
    component: RequestAcceptance
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/stories",
    name: "Instagram",
    component: Instagram
  },
  {
    path: "/taskboard",
    name: "Tasks",
    component: TaskBoard
  },
  {
    path: "/task-status-update/:uuid",
    name: "Task Status",
    component: TaskStatusUpdate
  },
  {
    path: "/useful-links",
    name: "Useful Links",
    component: UsefulLinks
  },
  {
    path: "/login",
    name: "Volunteer Login",
    component: VolunteerLogin
  },
  {
    path: "",
    name: "Dashboard",
    component: Index
  }
];
export default routes;