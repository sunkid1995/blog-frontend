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
  GET_ALL_COMMENT: 'serviceApi/GET_ALL_COMMENT',
  CREATE_LIKE: 'serviceApi/CREATE_LIKE',
  UNLIKE_LIKE: 'serviceApi/UNLIKE_LIKE',
  CREATE_POST: 'serviceApi/CREATE_POST',
  CREATE_COMMENT: 'serviceApi/CREATE_COMMENT',
};

export const SHARED = {

};
