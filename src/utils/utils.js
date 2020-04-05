import {NotificationManager} from "react-notifications";
import config from "../config/config";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import React from "react";

export const makeApiCall = (url, method, data, successCb = null, notify = true) => {
  if (method === 'GET') {
    const urlObj = new URL(url);
    Object.keys(data).forEach(key => urlObj.searchParams.append(key, data[key]));
    apiCall(urlObj, {}, successCb, notify)
  }
  else {
    const urlSearchParams = new URLSearchParams();
    Object.keys(data).forEach(key => urlSearchParams.append(key, data[key]));
    const requestOptions = {
      method: method,
      body: urlSearchParams
    };
    // console.log(url, data, requestOptions);
    apiCall(url, requestOptions, successCb, notify)
  }
};

const apiCall = (url, requestOptions, successCb, notify) => {
  const token = localStorage.getItem(config.tokenStorageKey);
  if (token) {
    if (requestOptions.headers) {
      requestOptions.headers.add('Authorization', 'token ' + token);
    }
    else {
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
        NotificationManager.error(data.string_response || 'API Failure');
      }
    } else {
      NotificationManager.error('Failure in api call');
    }
  })
  .catch(error => {
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

export const renderInfoCard = (title, content, size=5) => {
  return (
      <Col lg={size} className="mb-5 mb-xl-0">
        <Card className="shadow border-0 full-height-card">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-uppercase text-muted text-center mt-2 mb-2">
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