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
import AdminLogin from "views/login/AdminLogin";
import OurPartners from "views/static-info/OurPartners";
import ContactUs from "views/ContactUs";
import Tables from "views/Tables";
import About from "views/static-info/About";
import RequestsView from "views/request/RequestsView";
import HowItWorks from "views/static-info/HowItWorks";
import VerifyRequest from "views/request/verifyRequest";
import MapView from "./views/map/MapView";
import ViewDataOnMap from "./views/map/ViewDataOnMap";
import UsefulLinks from "./views/static-info/UsefulLinks";
import VolunteerLogin from 'views/login/VolunteerLogin';
import RequestAcceptance from "views/request/RequestAccentance";
import TaskBoard from "views/TaskBoard";
import TaskStatusUpdate from 'views/TaskStatusUpdate';
import NGOFormView from "./views/request/NGOFormView";
import FAQ from "views/static-info/FAQ";
import Disclaimer from "./views/static-info/Disclaimer";
import TermsOfUse from "./views/static-info/TermsOfUse";
import GetHelpRegistration from  "./views/FullRequestForm"

const routes = [
  {
    path: "/mapview",
    name: "Map View",
    component: MapView
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
    path: "/login",
    name: "Volunteer Login",
    component: VolunteerLogin
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
    key: "createNgoRequest",
    path: "/create_ngo_request/",
    name: "Add New Request",
    component: NGOFormView,
    icon: "fas fa-hands-helping",
    loginRequired: true
  },
  {
    path: "/requests/:type",
    name: "Requests",
    component: RequestsView
  },
  {
    key: "pendingRequests",
    path: "/pending-requests",
    name: "Pending Requests",
    component: RequestsView,
    icon: "fa fa-tasks",
    loginRequired: false
  },
  {
    key: "fullRequestForm",
    path: "/full_request_form",
    name: "Full Request Form",
    component: GetHelpRegistration,
    loginRequired: false
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
    key: "usefulLinks",
    path: "/useful-links",
    name: "Useful Links",
    component: UsefulLinks,
    icon: "fas fa-link",
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
    path: "",
    name: "Dashboard",
    component: Index
  }
];
export default routes;
