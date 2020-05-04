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
import PendingRequests from "views/PendingRequests";
import NewRequests from "views/NewRequests";
import InProgressRequests from "views/InProgressRequests";
import VerifyRequest from "views/verifyRequest";
import MapView from "./views/MapView";
import Instagram from "views/Instagram";
import UsefulLinks from "./views/UsefulLinks";
import VolunteerLogin from 'views/VolunteerLogin';
import RequestAcceptance from "views/RequestAccentance";
import TaskBoard from "views/TaskBoard";
import TaskStatusUpdate from 'views/TaskStatusUpdate';
import NGOFormView from "./views/NGOFormView";

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
    key: "contactUs",
    path: "/contact-us",
    name: "Contact Us",
    component: ContactUs,
    icon: "fas fa-address-card",
    loginRequired: false
  },
  {
    key: "pendingRequests",
    path: "/pending-requests",
    name: "Pending Requests",
    component: PendingRequests,
    icon: "fa fa-tasks",
    loginRequired: false
  },
  {
    key: "newRequests",
    path: "/new-requests",
    name: "New Requests",
    component: NewRequests,
    icon: "fas fa-clipboard",
    loginRequired: true
  },
  {
    key: "inProgressRequests",
    path: "/in-progress-requests",
    name: "In Progress Requests",
    component: InProgressRequests,
    icon: "fas fa-clipboard-list",
    loginRequired: true
  },
  {
    key: "completedRequests",
    path: "/completed-requests",
    name: "Completed Requests",
    component: PendingRequests,
    icon: "fas fa-clipboard-check",
    loginRequired: true
  },
  {
    path: "/verify/:uuid",
    name: "Veify Request",
    component: VerifyRequest
  },
  {
    key: "createNgoRequest",
    path: "/create_ngo_request/",
    name: "Add New Request",
    component: NGOFormView,
    icon: "fas fa-hands-helping",
    loginRequired: true
  },
  {
    path: "/accept/:uuid",
    name: "Accept Request",
    component: RequestAcceptance
  },
  {
    key: "tables",
    path: "/tables",
    name: "See Tables",
    component: Tables,
    icon: "ni ni-bullet-list-67",
    loginRequired: true
  },
  {
    key: "about",
    path: "/about",
    name: "About COVID SOS",
    component: About,
    icon: "fas fa-users",
    loginRequired: false
  },
  {
    key: "stories",
    path: "/stories",
    name: "Volunteer Stories",
    component: Instagram,
    icon: "fab fa-instagram",
    loginRequired: false
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
    key: "usefulLinks",
    path: "/useful-links",
    name: "Useful Links",
    component: UsefulLinks,
    icon: "fas fa-link",
    loginRequired: false
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