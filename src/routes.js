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
import Information from "views/Information";
import Organisations from "views/Organisations";
import Tables from "views/Tables";

var routes = [
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
    path: "/information",
    name: "Important Information",
    component: Information
  },
  {
    path: "/organisations",
    name: "Supporting Organisations",
    component: Organisations
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables
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
];
export default routes;
