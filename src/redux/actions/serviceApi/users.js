import { createAction } from 'redux-actions';
import qs from 'qs';

// Constants
import { API_CONFIGS } from 'src/constants';

// Models
import User from 'src/models/User';

// Redux
import { SERVICE_API } from 'src/redux/types';

// Utils
import { responseInterceptor } from 'src/redux/utils';

const { REQUEST_METHODS: { PATCH, POST } } = API_CONFIGS;

export function authWithEmail({ email, password }) {
  const action = createAction(SERVICE_API.AUTH_WITH_EMAIL);
  const dataKey = 'emailAuth';
  // const manifest = { klass: User.klass };

  const data = qs.stringify({ username: email, password });
  return dispatch => {
    const request = {
      data,
      method: POST,
      url: '/login',
      transformResponse: response =>
        responseInterceptor(response, ({ data }) => User.build(data)),
    };

    return dispatch(action({ dataKey, request }));
  };
}

export function forgotPassword(email) {
  const action = createAction(SERVICE_API.FORGOT_PASSWORD);
  const dataKey = 'passwordForgotten';
  const manifest = { reserved: true };

  return dispatch => {
    const request = {
      data: { email },
      method: POST,
      url: '/users/password',
    };

    return dispatch(action({ dataKey, manifest, request }));
  };
}

export function resetPassword({ password, passwordConfirm, token }) {
  const action = createAction(SERVICE_API.RESET_PASSWORD);
  const dataKey = 'passwordReset';
  const manifest = { reserved: true };

  return dispatch => {
    const data = {
      password,
      reset_password_token: token,
      password_confirmation: passwordConfirm,
    };

    const request = {
      data,
      method: PATCH,
      url: '/users/password',
    };

    return dispatch(action({ dataKey, manifest, request }));
  };
}

