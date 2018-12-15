import { createAction } from 'redux-actions';
import qs from 'qs';

// Constants
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

const { REQUEST_METHODS: { GET, POST, DELETE } } = API_CONFIGS;

export function getAllLike(payload) {
  const { page, perPage } = payload;

  const action = createAction(SERVICE_API.GET_ALL_LIKE);
  const dataKey = 'allLike';

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      params: {
        page, perPage,
      },
      method: GET,
      transformResponse: response =>
        responseInterceptor(response, ({ data }) => data),
      url:'/like',
    };
    return dispatch(action({ request, dataKey }));
  };
}

export function createLike(payload) {
  const { userId, postId, like } = payload;

  const action = createAction(SERVICE_API.CREATE_LIKE);
  const dataKey = 'createLike';

  const data = qs.stringify({ userId, postId, like });
  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      data,
      method: POST,
      transformResponse: response =>
        responseInterceptor(response, ({ success, error }) => ({ success, error })),
      url: '/create_like_post',
    };
    dispatch(action({ dataKey, request }));
  };
}

export function unLike(payload) {
  const { userId, postId, _id } = payload;
  const action = createAction(SERVICE_API.UNLIKE_LIKE);
  const dataKey = 'unLike';


  const data = qs.stringify({
    userId, postId, likeId: _id, 
  });

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      data,
      method: DELETE,
      transformResponse: response =>
        responseInterceptor(response, ({ success, error }) => ({ success, error })),
      url: '/unlike_post',
    };
    dispatch(action({ request, dataKey }));
  };
}
