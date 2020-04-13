const prodBaseUrl = 'https://api.covidsos.org';
const stgBaseUrl = 'https://api.stg.covidsos.org';

const prodUiUrl = 'https://covidsos.org';
const stgUiUrl = 'https://stg.covidsos.org';

const getConfig = () => {
  const buildEnv = process.env.REACT_APP_ENV;
  let baseUrl = stgBaseUrl;
  let uiUrl = stgUiUrl;
  if (buildEnv === 'prod') {
    baseUrl = prodBaseUrl;
    uiUrl = prodUiUrl;
  }
  return {
    baseUrl: baseUrl,
    uiUrl: uiUrl,
    volunteerEndpoint: baseUrl + '/create_volunteer',
    requestEndpoint: baseUrl + '/create_request',
    orgEndpoint: baseUrl + '/reachout_form',
    loginEndpoint: baseUrl + '/login',
    newUserEndpoint: baseUrl + '/new_user',
    summaryEndpoint: baseUrl + '/top_ticker',
    mapEndpoint: baseUrl + '/public_map_data',
    mapAuthEndpoint: baseUrl + '/private_map_data',
    assignEndpoint: baseUrl + '/assign_volunteer',
    updateRequestEndpoint: baseUrl + '/update_request_info',
    updateVolunteerEndpoint: baseUrl + '/update_volunteer_info',
    pendingRequests: baseUrl + '/pending_requests',
    requestStatusList: baseUrl + '/request_status_list',
    getVerifyRequest: baseUrl + '/verify_request_page',
    verifyRequest: baseUrl + '/verify_request',
    successStories: baseUrl + '/success_stories',
    requestOTP: baseUrl + '/request_otp',
    resendOTP: baseUrl + '/resend_otp',
    verifytOTP: baseUrl + '/verify_otp',


    accessTypeStorageKey: 'access_level',
    userNameStorageKey: 'username',
    fullNameStorageKey: 'full_name',
    userIdStorageKey: 'user_id',
    tokenStorageKey: 'jwt_token',
    alreadyAccessedSessionStorageKey: 'already_accessed',
    superuserAccessKey: 'superuser',
    sourceKey: 'source',
    redirectToPageKey: 'redirectToPage',
    googleMapAPIToken: 'AIzaSyAIdQoc3j8rPP5jMtdNZd26e5QB509TvZ0'
  }
};

export default getConfig();