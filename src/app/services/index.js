import request, { APIs } from '@/app/services/request';

// const a = {
//   totalSupply: '1000',
//   percentage: '30.00',
//   floor: '--',
//   unitPrice: '30.00',
//   '24hVolume': '--',
//   '24hSales': '30',
//   totalVolume: '30',
//   totalSales: '30',
//   owners: '30',
//   listed: '30',
//   marketCap: '30',
// };


// 市场列表
//   [APIs.MARKET_LIST]: '/api/shop/goods2',
//   新URL         https://api3.conins.io/shop?recently=2&merged=2&owner=&quantity_min=90&unit_price_start=0&unit_price_end=100000&price_asc=0&index=0&size=5
//   市场价格列表
//     [APIs.MARKET_STATISTICS]: '/api/shop/statistics',
//   新URL         https://api3.conins.io/shop/statistics
//   我的未上架列表
//     [APIs.MY_CFXs_LIST]: '/api/main/newlist',
//   新URL         https://api3.conins.io/cfxs/my/new?owner=0x9Bbc0e55978B5598563D151b11F3c8A3D06CC30d&index=0&size=10
//   旧合约可领取列表
//     [APIs.MY_OLD_CFXs_LIST]: '/main',
//   新URL          https://api3.conins.io/cfxs/my/old?owner=0x9Bbc0e55978B5598563D151b11F3c8A3D06CC30d&index=0&size=10
//
//   我的已上架列表
// https://api3.conins.io/shop/my?recently=0&merged=0&owner=0xb56A904da7DFf77449bbb719827a0a5f724b8a05&quantity_min=1&unit_price_start=0&unit_price_end=100000&price_asc=0&index=0&size=50


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
