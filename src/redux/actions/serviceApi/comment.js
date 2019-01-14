import { createAction } from 'redux-actions';
import qs from 'qs';

// Constant
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';


const { REQUEST_METHODS: { POST } } = API_CONFIGS;

export function createComment(payload) {
  const { postId, userId, comment } = payload;
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
