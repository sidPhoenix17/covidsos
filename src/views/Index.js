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
import React from "react";
// node.js library that concatenates classes (strings)
// reactstrap components
import Header from "../components/Headers/Header.js";
import config from "../config/config";
import {getFormPopup, isAuthorisedUserLoggedIn, isLoggedIn} from "../utils/utils";
import queryString from "query-string";
import RequestsContainer from "../components/containers/RequestsContainer";
import InstagramContainer from "../components/containers/InstagramContainer";

const defaultState = {
  activeForm: 0,
  isPopupOpen: false,
};

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.register) {
      switch (queryParams.register.toLowerCase()) {
        case 'volunteer':
          this.state = {...defaultState, isPopupOpen: true, activeForm: 1}
          break;
        case 'request':
          this.state = {...defaultState, isPopupOpen: true, activeForm: 2}
          break;
        default:
          this.state = defaultState;
      }
    }
  }

  getPopup() {
    if (this.state.activeForm === 3 ||
        ((sessionStorage.getItem(config.alreadyAccessedSessionStorageKey) ||
            isLoggedIn()) && this.state.activeForm === 0)) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return getFormPopup(
        false,
        this.state.isPopupOpen,
        this.state.activeForm,
        () => this.setState({activeForm: 0, isPopupOpen: false}),
        (activeForm) => {
          this.setState({activeForm});
        })
  }

  render() {
    const adminLoggedIn = isAuthorisedUserLoggedIn();
    return (
        <>
          {this.getPopup()}
          <Header showCards={!adminLoggedIn} adminCards={!!adminLoggedIn}
                  onOptionSelect={(activeForm) => {
                    const newState = {activeForm: activeForm};
                    if (this.state.activeForm === activeForm) {
                      newState.activeForm = 0;
                    }
                    if (activeForm === 1 || activeForm === 2) {
                      newState.isPopupOpen = true;
                    }
                    this.setState(newState);
                  }} redirectTo={(link) => this.props.history.push(link)}/>
          {/* --------- Requests --------- */}
          <RequestsContainer/>
          {/* --------- Volunteer Stories --------- */}
          {!adminLoggedIn && <InstagramContainer/>}
        </>
    );
  }
}

export default Index;
