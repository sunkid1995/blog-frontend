const { env } = require('src/data/configs.json');

export const IN_DEV_MODE = process.env.NODE_ENV !== 'production' && env !== 'staging';

export const API_CONFIGS = {
  PAGINATION: 10,
  REQUEST_METHODS: {
    DELETE: 'delete',
    GET: 'get',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put',
  },
  RESPONSE_STATUSES: {
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    SERVICE_UNAVAILABLE: 503,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
  },
};

export const AXIOS_REQUEST_SUFFIXES = { ERROR: ':ERROR', SUCCESS: ':SUCCESS' };

export const DEBUGS = !IN_DEV_MODE ? {} : {
  UNAUTHORIZED: false,
};

export const FORMATSDATE = {
  DATE: 'DD/MM/YYYY',
  DATE_TIME: 'DD/MM/YYYY HH:mm',
  ISO_8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  TIME: 'HH:mm',
};

export const FORMAT = {
  EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
  PHONE: /^0(1\d{9}|9\d{8})$/,
};

export const FORMAT_NUMBER = {
  CURRENCY_FULL: '0,0 $',
  CURRENCY_NUMBER: '0,0',
  NUMBER: '0',
};


const NOTIFICATIONS = 'notifications';
const MESSAGE = 'message';

export const MENU_BAR = {
  [NOTIFICATIONS]: {
    enabled: true,
    href: '/',
    title: 'Trang chủ',
    icon: <i className="far fa-bell" />,
  },
  [MESSAGE]: {
    enabled: true,
    href: '/',
    title: 'Tin Nhắn',
    icon: <i className="fab fa-facebook-messenger" />,
  },
};

// Menu tab list left
const HOT = 'host';
const NEW = 'new';
const TOP = 'top';

export const MENU_TAB_LIST_LEFT = {
  [HOT]: {
    enabled: true,
    href: '/hot',
    title: 'Đang hot',
    icon: <i className="fab fa-hotjar" />,
  },
  [NEW]: {
    enabled: true,
    href: '/new',
    title: 'Mới nhất',
    icon: <i className="fas fa-newspaper" />,
  },
  [TOP]: {
    enabled: true,
    href: '/top',
    title: 'Top',
    icon: <i className="fas fa-crown" />,
  },
};
export const MENU_TAB_LIST_LEFT_IDS = { HOT, NEW, TOP };

export const MENU_BAR_IDS = { NOTIFICATIONS, MESSAGE };
