import queryString from 'query-string';

export const APIs = {
  MARKET_LIST: 'MARKET_LIST',
  MARKET_STATISTICS:'MARKET_STATISTICS'
};

export const isTest = process.env.NEXT_PUBLIC_IsTest === 'true';

const testApi = {
  [APIs.MARKET_LIST]: '/test/api/shop/goods',
  [APIs.MARKET_STATISTICS]: '/test/api/shop/statistics',

};

const productApi = {
  [APIs.MARKET_LIST]: '/api/shop/goods2',
  [APIs.MARKET_STATISTICS]: '/api/shop/statistics',
};

const request = async (api, { params, ...rest } = {}) => {
  const url = !isTest ? testApi[api] : productApi[api];
  const stringifiedUrl = url + '?' + queryString.stringify(params || {});

  return fetch(stringifiedUrl, rest).then((response) => response.json());
};

export default request;
