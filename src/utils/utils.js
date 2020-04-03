import {NotificationManager} from "react-notifications";
import {config} from "../config/config";

export const makeApiCall = (url, method, data, successCb = null, notify = true) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));

  const requestOptions = {
    method: method,
    body: formData
  };
  console.log(url, requestOptions);
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
      }
      else {
        NotificationManager.error(data.string_response || 'API Failure');
      }
    }
    else {
      NotificationManager.error('Failure in api call');
    }
  })
  .catch(error => {
    console.log(url, error);
    NotificationManager.error(error.toString());
  });
};

export const isSuperUser = () => {
  return localStorage.getItem(config.accessTypeStorageKey) === config.superuserAccessKey;
};
