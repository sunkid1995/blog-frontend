import { createAction } from 'redux-actions';
import qs from 'qs';

// Constant
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

// Models
import CommentModel from 'src/models/CommentModel';

const { REQUEST_METHODS: { GET, POST } } = API_CONFIGS;

export function getAllComment(payload) {
  const { page, perPage } = payload;
  const action = createAction(SERVICE_API.GET_ALL_COMMENT);
  const dataKey = 'allComment';

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      params: {
        page, perPage,
      },
      method: GET,
      transformResponse: response =>
        responseInterceptor(response, ({ data }) => CommentModel.buildArray(data)),
      url: '',
    };
    return dispatch(action({ request, dataKey }));
  };
}

export function createComment(payload) {
  const { postId, userId, comment } = payload;
  console.log(payload, 'payload');
  const action = createAction(SERVICE_API.CREATE_COMMENT);
  const dataKey = 'handleComment';

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      data: qs.stringify({ postId, userId, comment }),
      method: POST,
      transformResponse: response =>
        responseInterceptor(response, ({ error }) => error),
      url:'/create_comment_post',
    };
    dispatch(action({ request, dataKey }));
  };
}
