import { createAction } from 'redux-actions';

// Contants
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

const { REQUEST_METHODS: { GET } } = API_CONFIGS;

export function getAllPost() {
  const action = createAction(SERVICE_API.GET_ALL_POST);
  const dataKey = 'allPost';

  return (dispatch, getState) => {
    const request = {
      headers: buildHeaders(getState()),
      method: GET,
      url:'/posts',
      transformResponse: response =>
        responseInterceptor(response, ({ data }) => data),
    };
    return dispatch(action({ request, dataKey }));
  };
}

export function demo() {
}
