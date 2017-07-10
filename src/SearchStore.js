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
function handleQuickResult(fromObj, toObj) {
  quickResult.from.unshift(fromObj);
  quickResult.from.length = quickResult.from.length > 3 ? 3 : quickResult.from.length;
  quickResult.to.unshift(toObj);
  quickResult.to.length = quickResult.to.length > 3 ? 3 : quickResult.to.length;
}
const getSearchIdFromObj = obj => obj.SiteId || obj.Name;

const searchStore = {
  fetch: (fromObj, toObj) => {
    handleQuickResult(fromObj, toObj);
    localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
    return new Promise((resolve, reject) => {
      axios.post('api/search', { originId: getSearchIdFromObj(fromObj), destId: getSearchIdFromObj(toObj) }).then(data => {
        result = data.data;
        resolve(result.map(i => Object.assign(i, { detailed: false })));
      })
    })
  },
  typeahead: str => {
    return new Promise((resolve, reject) => {
      axios.post('api/typeahead', { 'searchstring': str }).then(data => {
        resolve(data.data);
      })
    })
  },
  getResult: () => result,
  quickResult: () => quickResult
}
export default searchStore
