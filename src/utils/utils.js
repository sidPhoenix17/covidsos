import {NotificationManager} from "react-notifications";
import {config} from "../config/config";

export const makeApiCall = (url, method, data, successCb = null, notify = true) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));

  const requestOptions = {
    method: method,
    body: formData
  };
  // console.log(url, data, requestOptions);
  apiCall(url, requestOptions, successCb, notify)
};

const apiCall = (url, requestOptions, successCb, notify) => {
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

export const validateEmail = (email) => {
  if (/.+@.+\..+/.test(email)) {
    return true;
  } else {
    NotificationManager.error('Please enter a valid email id');
    return false;
  }
};

export const validateMobile = (mobileNumber) => {
  if (mobileNumber[0] === '0') {
    mobileNumber = mobileNumber.substring(1);
  }
  if (mobileNumber.indexOf("+91") === 0) {
    mobileNumber = mobileNumber.substring(3);
  }
  if (mobileNumber.length === 10 && /[6-9][0-9]{9}/.test(mobileNumber)) {
    return true;
  } else {
    NotificationManager.error('Please enter a valid 10-digit mobile number');
    return false;
  }
};