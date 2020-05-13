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
import OurPartners from "views/OurPartners";
import ContactUs from "views/ContactUs";
import Tables from "views/Tables";
import About from "views/About";
import PendingRequests from "views/PendingRequests";
import NewRequests from "views/NewRequests";
import InProgressRequests from "views/InProgressRequests";
import HowItWorks from "views/HowItWorks";
import VerifyRequest from "views/verifyRequest";
import MapView from "./views/MapView";
import ViewDataOnMap from "./views/ViewDataOnMap";
import UsefulLinks from "./views/UsefulLinks";
import VolunteerLogin from 'views/VolunteerLogin';
import RequestAcceptance from "views/RequestAccentance";
import TaskBoard from "views/TaskBoard";
import TaskStatusUpdate from 'views/TaskStatusUpdate';
import NGOFormView from "./views/NGOFormView";
import FAQ from "views/FAQ";
import Disclaimer from "./views/Disclaimer";
import TermsOfUse from "./views/TermsOfUse";

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
    key: "ourPartners",
    path: "/our-partners",
    name: "Our Partners",
    component: OurPartners,
    icon: "fas fa-users",
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
    key: "pendingRequests",
    path: "/pending-requests",
    name: "Pending Requests",
    component: PendingRequests,
    icon: "fa fa-tasks",
    loginRequired: false
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
    icon: "fas fa-info-circle",
    loginRequired: false
  },
  {
    key: "faq",
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    icon: "fas fa-question-circle",
    loginRequired: false
  },
  {
    key: "howItWorks",
    path: "/how-it-works",
    name: "How it works",
    component: HowItWorks,
    icon: "fas fa-info",
    loginRequired: false
  },
  {
    key: "disclaimer",
    path: "/disclaimer",
    name: "Disclaimer",
    component: Disclaimer,
    icon: "fas fa-info",
    loginRequired: false
  },
  {
    key: "terms-of-use",
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: TermsOfUse,
    icon: "fas fa-info",
    loginRequired: false
  },
  {
    key: "viewOnMap",
    path: "/view-on-map",
    name: "View on Map",
    component: ViewDataOnMap,
    icon: "fas fa-map-marked-alt",
    loginRequired: false
  },
  {
    path: "/taskboard",
    name: "Tasks",
    component: TaskBoard
  },
  {
    path: "/task-status-update/:uuid/:vid?",
    name: "Task Status",
    component: TaskStatusUpdate,
    admin: false
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
