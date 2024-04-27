/** 
 * @param {Array<Object>} arr 
 * */
module.exports = function reducer(arr) {
  let acc = {};
  for (let i = 0; i < arr.length; i++) {
    acc[arr[i].id] = i;
  }
  return acc;
}
