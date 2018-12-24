import { createAction } from 'redux-actions';

// Constant
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

// Models
import CommentModel from 'src/models/CommentModel';

const { REQUEST_METHODS: { GET } } = API_CONFIGS;

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

export function demo() {}
