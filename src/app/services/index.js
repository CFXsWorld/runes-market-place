import request, { APIs } from '@/app/services/request';
import queryString from 'query-string';

export const getMarketCFXsList = (_, { arg }) => {
  return request(APIs.MARKET_LIST, { method: 'get', params: arg });
};

export const getMarketStatistics = () => {
  return request(APIs.MARKET_STATISTICS, { method: 'get' });
};

export const getMyCFXsList = (_, { arg }) => {
  return request(APIs.MY_CFXs_LIST, { method: 'get', params: arg });
};

export const getMyOldCFXsList = (_, { arg }) => {
  return request(APIs.MY_OLD_CFXs_LIST, { method: 'get', params: arg });
};

export const getMyCFXsOrderList = (_, { arg }) => {
  return request(APIs.MY_CFXs_ORDER_LIST, { method: 'get', params: arg });
};
export const fetchSyncData = (_, { arg }) => {
  return fetch('/api/mint/mints' + '?' + queryString.stringify(arg || {})).then(
    (r) => r.text()
  );
};
