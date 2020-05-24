import {NotificationManager} from "react-notifications";
import config from "../config/config";
import {Button, Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import React from "react";
import Popup from "reactjs-popup";
import VolunteerPopupRegistration from "../components/Forms/VolunteerPopupRegistration";
import SeniorCitizenPopupRegistration from "../components/Forms/SeniorCitizenPopupRegistration";
import routes from "../routes";

export const makeApiCall = (url, method, data, successCb = null, notify = true, errorCb = null) => {
  if (method === 'GET') {
    const urlObj = new URL(url);
    Object.keys(data).forEach(key => urlObj.searchParams.append(key, data[key]));
    apiCall(urlObj, {}, successCb, notify, errorCb)
  } else {
    const urlSearchParams = new URLSearchParams();
    Object.keys(data).forEach(key => urlSearchParams.append(key, data[key]));
    const requestOptions = {
      method: method,
      body: urlSearchParams
    };
    // console.log(url, data, requestOptions);
    apiCall(url, requestOptions, successCb, notify, errorCb)
  }
};

const apiCall = (url, requestOptions, successCb, notify, errorCb) => {
  const token = localStorage.getItem(config.tokenStorageKey);
  if (token) {
    if (requestOptions.headers) {
      requestOptions.headers.add('Authorization', 'token ' + token);
    } else {
      requestOptions.headers = {'Authorization': 'token ' + token}
    }
  }
  fetch(url, requestOptions)
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => {
    if (data) {
      if (data.status) {
        if (notify) {
          NotificationManager.success(data.string_response || 'Success');
        }
        if (successCb) {
          successCb(data.Response);
        }
      } else {
        if (data.string_response === "Invalid token. Please log in again.") {
          localStorage.removeItem(config.tokenStorageKey);
        }
        if (errorCb) {
          errorCb(data);
        }
        NotificationManager.error(data.string_response || 'API Failure');
      }
    } else {
      NotificationManager.error('Failure in api call');
    }
  })
  .catch(error => {
    if (errorCb) {
      errorCb({}, error);
    }
    // console.log(url, error);
    NotificationManager.error(error.toString());
  });
};

export const isSuperUser = () => {
  return localStorage.getItem(config.accessTypeStorageKey) === config.superuserAccessKey;
};

export const isLoggedIn = () => {
  return localStorage.getItem(config.tokenStorageKey);
};

export const clearLoginData = () => {
  localStorage.removeItem(config.volunteerIdStorageKey);
  localStorage.removeItem(config.accessTypeStorageKey);
  localStorage.removeItem(config.tokenStorageKey);
};

export const isVolunteerLoggedIn = () => {
  return localStorage.getItem(config.tokenStorageKey) && localStorage.getItem(
      config.volunteerIdStorageKey);
};

export const isAuthorisedUserLoggedIn = () => {
  return localStorage.getItem(config.tokenStorageKey) &&
      (localStorage.getItem(config.accessTypeStorageKey) === 'superuser' ||
          localStorage.getItem(config.accessTypeStorageKey) === 'moderator');
};

export const validateEmail = (email) => {
  if (/.+@.+\..+/.test(email)) {
    return true;
  } else {
    NotificationManager.error('Please enter a valid email id');
    return false;
  }
};

export const sanitizeMobileNumber = (mobileNumber) => {
  if (mobileNumber[0] === '0') {
    mobileNumber = mobileNumber.substring(1);
  }
  if (mobileNumber.indexOf("+91") === 0) {
    mobileNumber = mobileNumber.substring(3);
  }
  return mobileNumber;
};

export const validateMobile = (mobileNumber) => {
  if (mobileNumber.length === 10 && /[6-9][0-9]{9}/.test(mobileNumber)) {
    return true;
  } else {
    NotificationManager.error('Please enter a valid 10-digit mobile number');
    return false;
  }
};

export const renderInfoCard = (title, content, size = 5) => {
  return (
      <Col lg={size} className="mb-5 mb-xl-0">
        <Card className="shadow border-0 full-height-card">
          <CardHeader className="bg-transparent pb-3">
            <div className="h3 text-muted text-center mt-2 mb-2">
              {title}
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5 text-justify">
            <div className="text-justify mt-2 mb-2">
              {content}
            </div>
          </CardBody>
        </Card>
      </Col>
  );
}

export const renderListItem = (imgSrc, imgAlt, content) => {
  return (
      <Row className="py-3">
        <Col xl="1"/>
        <Col sm="2" xl="1" className="text-center">
          <img className="list-item-image" alt={imgAlt} src={imgSrc}/>
        </Col>
        <Col sm="10" xl="9">{content}</Col>
      </Row>
  );
}

export const getFormPopup = (defaultOpen, open, activeForm, onCloseFunc, setActiveFormFunc) => {
  return (
      <Popup defaultOpen={defaultOpen} open={open} closeOnEscape closeOnDocumentClick
             position="right center"
             contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
             overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
             className="col-md-6"
             onClose={onCloseFunc}>
        {
          close => (
              <div className="pre-scrollable-full-height-popup">
                <CardHeader className="bg-transparent">
                  <Row className="justify-content-end">
                    <Button onClick={close}
                            className="close btn-icon btn-link border-0 text-dark">
                      <i className="fas fa-times" style={{fontSize: '1rem'}}/>
                    </Button>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col text-center">
                      {
                        activeForm === 1 ?
                            <>
                              Please answer a few questions for you to start helping people in need.
                            </>
                            :
                            activeForm === 2 ?
                                <>
                                  Answer these for us to help you better
                                </> :
                                <h2 className="mb-0">
                                  Welcome to COVID SOS
                                </h2>
                      }
                    </div>
                  </Row>
                </CardHeader>

                {
                  activeForm === 1 ?
                      <VolunteerPopupRegistration/> :
                      activeForm === 2 ?
                          <SeniorCitizenPopupRegistration/> :
                          <CardBody className="">
                            {
                              activeForm === 0 ?
                                  <Row className="justify-content-center text-center mb-4">
                                    Who are you?
                                  </Row> : null
                            }
                            <Row className="justify-content-center">
                              <Nav pills horizontal="center">
                                <NavItem className="pl-2 pr-2">
                                  <NavLink
                                      className="py-2 px-3 text-white bg-primary popup-button"
                                      href="#"
                                      onClick={e => {
                                        e.preventDefault();
                                        setActiveFormFunc(1);
                                      }}
                                  >
                                    <object type="image/svg+xml"
                                            data={require(
                                                "assets/img/icons/volunteer-hands.svg")}>
                                      Volunteer
                                    </object>
                                    Volunteer
                                  </NavLink>
                                </NavItem>
                                <NavItem className="pl-2 pr-2">
                                  <NavLink
                                      className="py-2 px-3 text-white bg-primary popup-button"
                                      href="#"
                                      onClick={e => {
                                        e.preventDefault();
                                        setActiveFormFunc(2);
                                      }}
                                  >
                                    <object type="image/svg+xml"
                                            data={require("assets/img/icons/old.svg")}>
                                      Senior Citizen
                                    </object>
                                    Senior Citizen
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </Row>
                          </CardBody>
                }
              </div>
          )}
      </Popup>
  );
}

export const getRouteForKey = (key) => {
  const matching = routes.filter(r => r.key === key).filter(
      r => !r.loginRequired || isAuthorisedUserLoggedIn());
  if (matching && matching.length === 1) {
    return matching[0];
  }
  return null;
}