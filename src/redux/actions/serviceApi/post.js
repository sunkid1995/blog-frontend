import { createAction } from 'redux-actions';
// import qs from 'qs';

// Contants
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

const { REQUEST_METHODS: { GET, POST } } = API_CONFIGS;

export function getAllPost(payload) {
  const { page, perPage } = payload;
  const action = createAction(SERVICE_API.GET_ALL_POST);
  const dataKey = 'allPost';

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      params: {
        page, perPage,
      },
      method: GET,
      url:'/posts',
      transformResponse: response =>
        responseInterceptor(response, ({ data }) => data),
    };
    return dispatch(action({ request, dataKey }));
  };
}

export function createPost(payload) {
  const { title, image, content, _id } = payload;
  const action = createAction(SERVICE_API.CREATE_POST);
  const dataKey = 'dataCreatePost';

  // multipart/form-data
  const bodyFormData = new FormData();
  bodyFormData.set('title', title);
  bodyFormData.set('content', content);
  bodyFormData.set('authorId', _id);
  bodyFormData.append('image', image);

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
      data: bodyFormData,
      method: POST,
      transformResponse: response =>
        responseInterceptor(response, ({ error }) => error),
      url: '/create_post',
    };
    dispatch(action({ request, dataKey }));
  };
}
