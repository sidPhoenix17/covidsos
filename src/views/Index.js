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
import {Card} from "reactstrap";
import Header from "../components/Headers/Header.js";
import MyCarousel from "../components/MyCarousel/MyCarousel";
import config from "../config/config";
import {getFormPopup, isLoggedIn, makeApiCall} from "../utils/utils";
import queryString from "query-string";
import AutoCompleteAddress from "../components/AutoComplete/Adress";
import haversine from "haversine-distance";

const defaultState = {
  activeForm: 0,
  isPopupOpen: false,
  requests: [],
  stories: [],
};

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.register) {
      switch (queryParams.register.toLowerCase()) {
        case 'volunteer':
          this.state = {...defaultState, activeForm: 1}
          break;
        case 'request':
          this.state = {...defaultState, activeForm: 2}
          break;
        default:
          this.state = defaultState;
      }
    }
    this.fetchPendingRequests();
    this.fetchInstagramStories();
  }

  fetchPendingRequests() {
    makeApiCall(config.pendingRequests, 'GET', {}, (response) => {
      this.setState({
        requests: (response.pending || [])
      })
    }, false);
  }

  fetchInstagramStories() {
    makeApiCall(config.successStories, 'GET', {}, (response) => {
      this.setState({
        stories: (response.instagram || [])
      })
    }, false);
  }

  getPopup() {
    if (this.state.activeForm === 3 ||
        ((sessionStorage.getItem(config.alreadyAccessedSessionStorageKey) ||
            isLoggedIn()) && this.state.activeForm === 0)) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return getFormPopup(
        true,
        this.state.isPopupOpen,
        this.state.activeForm,
        () => this.setState({activeForm: 0, isPopupOpen: false}),
        (activeForm) => {
          this.setState({activeForm});
        })
  }

  render() {
    const loggedIn = isLoggedIn();
    return (
        <>
          {this.getPopup()}
          <Header showCards={!loggedIn} adminCards={!!loggedIn} onOptionSelect={(activeForm) => {
            const newState = {activeForm: activeForm};
            if (this.state.activeForm === activeForm) {
              newState.activeForm = 0;
            }
            if (activeForm === 1 || activeForm === 2) {
              newState.isPopupOpen = true;
            }
            this.setState(newState);
          }} redirectTo={(link) => this.props.history.push(link)}/>
          {/* ------------------------------------------------------------------
              Pending request carousel 
          ------------------------------------------------------------------ */}
          {!loggedIn ?
              <Card className="requests-container pt-2 mt--6">
                <div className="text-uppercase col-12 pt-2 text-center h3">
                  Pending Requests
                </div>
                <div className="col-12 pt-3">
                  <AutoCompleteAddress
                      className="seachbox"
                      iconClass="fas fa-map-marker"
                      placeholder="Enter your location to see requests nearby"
                      domID='pending-requests-search-address'
                      onSelect={({latitude, longitude}) => {
                        this.setState({
                          requests: this.state.requests.sort((r1, r2) => {
                            const r1HaversineDistance = haversine(
                                {lat: r1.latitude, lng: r1.longitude},
                                {lat: latitude, lng: longitude});
                            const r2HaversineDistance = haversine(
                                {lat: r2.latitude, lng: r2.longitude},
                                {lat: latitude, lng: longitude});
                            return r1HaversineDistance - r2HaversineDistance;
                          }),
                        });
                      }}
                      showError={false}
                  />
                </div>
                <MyCarousel
                    data={this.state.requests}
                    renderer="RequestsSlide"
                />
              </Card>
              : null}

          {/* ------------------------------------------------------------------
              Volunteer Stories
          ------------------------------------------------------------------ */}
          {
            this.state.stories.length && !loggedIn ?
                <Card className="stories-container pt-2 mt-6">
                  <div className="text-uppercase col-12 pt-2 text-center h3">
                    Volunteer Stories
                  </div>
                  <MyCarousel
                      data={this.state.stories}
                      renderer="InstagramStorySlide"
                  />
                </Card>
                : null
          }
        </>
    );
  }
}

export default Index;
