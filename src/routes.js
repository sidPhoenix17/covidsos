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
import Login from "views/Login.js";
import ContactUs from "views/ContactUs";
import Tables from "views/Tables";
import About from "views/About";
import PendingRequests from "views/pendingRequests";
import VerifyRequest from "views/verifyRequest";
import MapView from "./views/MapView";
import Instagram from "views/Instagram";
import MobileLogin from 'views/MobileLogin';

const routes = [
  {
    path: "/mapview",
    name: "Map View",
    component: MapView
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/contact_us",
    name: "Contact Us",
    component: ContactUs
  },
  {
    path: "/pending-requests",
    name: "Pending Requests",
    component: PendingRequests
  },
  {
    path: "/verify/:uuid",
    name: "Veify Request",
    component: VerifyRequest
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
    path: "",
    name: "Dashboard",
    component: Index
  },
  {
    path: "/index",
    name: "Dashboard",
    component: Index
  },
  {
    path: "/mobile_number/login",
    name: "Mobile Login",
    component: MobileLogin
  },
];
export default routes;
