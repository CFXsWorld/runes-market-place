// // get ids by account from server
//
// import { getAddress } from "ethers";
//
// // http://test.conins.io/ is old cfxs contract
// // http://test.conins.io/newlist is new cfxs contract
// fetch(
//   `http://test.conins.io/?owner=${getAddress(
//     account()
//   )}&startIndex=${cfxsStartIndex}&size=128`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     // return count is totalCount, rows is ids array
//   })
//   .catch((err) => {
//     console.error(err);
//   });
//
// // del ids from server after call bridge contract successful
//
// const delData = new URLSearchParams();
// delData.append("id", `["123","124","125"]`);
// delData.append("owner", getAddress(account())); //checksum address
// fetch(`http://test.conins.io/del`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: delData,
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
