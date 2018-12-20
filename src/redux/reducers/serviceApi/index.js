import _ from 'lodash';

// Constants
import { AUTH, SERVICE_API } from 'src/redux/types';

// Locals
// import blankRequestReducer from './blankRequestReducer';
// import paginatedRequestReducer from './paginatedRequestReducer';
import plainRequestReducer from './plainRequestReducer';

const INITIAL_BLANK_REQUEST = { error: undefined, loading: false };
// const INITIAL_PAGINATED_DATA_REQUEST = { dataPages: {}, totalPages: 1, ...INITIAL_BLANK_REQUEST };
const INITIAL_PLAIN_DATA_REQUEST = { data: undefined, ...INITIAL_BLANK_REQUEST };

const INITIAL_STATE = {
  emailAuth: INITIAL_PLAIN_DATA_REQUEST,
  passwordForgotten: INITIAL_PLAIN_DATA_REQUEST,
  passwordReset: INITIAL_PLAIN_DATA_REQUEST,
  allPost: INITIAL_PLAIN_DATA_REQUEST,
  allLike: INITIAL_PLAIN_DATA_REQUEST,
  createLike: INITIAL_BLANK_REQUEST,
  unLike: INITIAL_BLANK_REQUEST,
  dataCreatePost: INITIAL_BLANK_REQUEST,
};

export default function serviceApiReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === AUTH.DEAUTHORIZE) return INITIAL_STATE;

  if (
    _.startsWith(type, SERVICE_API.AUTH_WITH_EMAIL) ||
    _.startsWith(type, SERVICE_API.FORGOT_PASSWORD) ||
    _.startsWith(type, SERVICE_API.RESET_PASSWORD) ||
    _.startsWith(type, SERVICE_API.GET_ALL_POST) ||
    _.startsWith(type, SERVICE_API.GET_ALL_LIKE) ||
    _.startsWith(type, SERVICE_API.CREATE_POST)
  ) return plainRequestReducer(state, action);

  return state;
}
