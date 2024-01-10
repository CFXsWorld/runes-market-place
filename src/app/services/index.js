import request, { APIs } from '@/app/services/request';

export const getMarketCFXsList = (aaa, { arg }) => {
  return request(APIs.MARKET_LIST, { method: 'get', params: arg });
};
