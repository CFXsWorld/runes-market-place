import queryString from 'query-string';

export const APIs = {
  MARKET_LIST: 'MARKET_LIST',
  MARKET_STATISTICS: 'MARKET_STATISTICS',
  MY_CFXs_LIST: 'MY_CFXs_LIST',
  MY_CFXs_ORDER_LIST: 'MY_CFXs_ORDER_LIST',
  MY_OLD_CFXs_LIST: 'MY_OLD_CFXs_LIST',
  CLAIM_SYNC_DATA: 'CLAIM_SYNC_DATA',
  MY_NFT_LIST: 'CLAIM_SYNC_DATA',
};

export const isTest = process.env.NEXT_PUBLIC_IsTest === 'true';

const testApi = {
  [APIs.MARKET_LIST]: '/test/api/shop/goods',
  [APIs.MARKET_STATISTICS]: '/test/api/shop/statistics',
  [APIs.MY_CFXs_LIST]: '/test/api/newlist',
  [APIs.MY_OLD_CFXs_LIST]: '/getCFXsListTest',
};

const productApi = {
  [APIs.MARKET_LIST]: '/api/shop',
  [APIs.MARKET_STATISTICS]: '/api/shop/statistics',
  [APIs.MY_CFXs_ORDER_LIST]: '/api/shop/my',
  [APIs.MY_CFXs_LIST]: '/api/cfxs/my/new',
  [APIs.MY_OLD_CFXs_LIST]: '/api/cfxs/my/old',
  [APIs.CLAIM_SYNC_DATA]: '/api/mint/mints',
  [APIs.MY_NFT_LIST]: '/api/cfxs/my/nft',
};

const request = async (api, { params, ...rest } = {}) => {
  const url = isTest ? testApi[api] : productApi[api];
  const stringifiedUrl = url + '?' + queryString.stringify(params || {});

  return fetch(stringifiedUrl, rest).then((response) => response.json());
};

export default request;
