import queryString from 'query-string';

export const APIs = {
  MARKET_LIST: 'MARKET_LIST',
};

export const isTest = process.env.NEXT_PUBLIC_IsTest === 'true';

const testApi = {
  [APIs.MARKET_LIST]: '/test/api/shop/goods',
};

const productApi = {
  [APIs.MARKET_LIST]: '/api/shop/goods',
};

const request = async (api, { params, ...rest } = {}) => {
  const url = !isTest ? testApi[api] : productApi[api];
  const stringifiedUrl = url + '?' + queryString.stringify(params || {});

  return fetch(stringifiedUrl, rest).then((response) => response.json());
};

export default request;
