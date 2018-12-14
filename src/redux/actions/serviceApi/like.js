import { createAction } from 'redux-actions';

// Constants
import { API_CONFIGS } from 'src/constants';

// Redux types
import { SERVICE_API } from 'src/redux/types';

// Utils
import { buildHeaders, responseInterceptor } from 'src/redux/utils';

const { REQUEST_METHODS: { GET } } = API_CONFIGS;

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

export function demo() {}
