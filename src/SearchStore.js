/* global localStorage */
import axios from 'axios'

var result = [];
const quickResultKey = 'quickresult';
var quickResult = JSON.parse(localStorage.getItem(quickResultKey));
if (!quickResult) {
  quickResult = {
    from: [],
    to: []
  }
}
function handleQuickResult (searchObj) {
  quickResult.from.unshift(searchObj.originId);
  quickResult.from.length = quickResult.from.length > 3 ? 3 : quickResult.from.length;
  quickResult.to.unshift(searchObj.destId);
  quickResult.to.length = quickResult.to.length > 3 ? 3 : quickResult.to.length;
  console.log(quickResult, searchObj);
}
const searchStore = {
  fetch: searchObj => {
    handleQuickResult(searchObj);
    localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
    return new Promise((resolve, reject) => {
      axios.post('api/search', searchObj).then(data => {
        result = data.data;
        resolve(result);
      })
    })
  },
  get: () => result,
  quickResult: () => quickResult
}
export default searchStore
