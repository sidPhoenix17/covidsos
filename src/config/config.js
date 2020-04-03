// const baseUrl = 'http://localhost';
const baseUrl = 'https://api.covidsos.org';

export const config = {
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

  accessTypeStorageKey: 'access_level',
  userNameStorageKey: 'username',
  fullNameStorageKey: 'full_name',
  userIdStorageKey: 'user_id',
  alreadyAccessedSessionStorageKey: 'already_accessed',
  superuserAccessKey: 'superuser',
};

export const organisationOptions = [
  {value: 'GreenDream', label: 'Green Dream Foundation'},
  {value: 'covidsos', label: 'No particular organisation '}
];