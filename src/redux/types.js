export const PREFIXES = {
  AUTH: 'auth/',
  SERVICE_API: 'serviceApi/',
  SHARED: 'shared/',
};

export const INIT_ACTION = { type: '@@redux/INIT' };

export const AUTH = {
  AUTHORIZE: 'auth/AUTHORIZE',
  DEAUTHORIZE: 'auth/DEAUTHORIZE',
};

export const SERVICE_API = {
  AUTH_WITH_EMAIL: 'serviceApi/AUTH_WITH_EMAIL',
  FORGOT_PASSWORD: 'serviceApi/FORGOT_PASSWORD',
  RESET_PASSWORD: 'serviceApi/RESET_PASSWORD',
  GET_ALL_POST: 'serviceApi/GET_ALL_POST',
  GET_ALL_LIKE: 'serviceApi/GET_ALL_LIKE',
};

export const SHARED = {

};
