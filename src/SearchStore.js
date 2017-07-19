/* global localStorage */
import axios from 'axios'

let currentlocalStorageVersion = '0.2';
let storedVersion = localStorage.getItem('localStorageVersion');
if (currentlocalStorageVersion !== storedVersion) {
  localStorage.clear();
  localStorage.setItem('localStorageVersion', currentlocalStorageVersion);
}

var result = [];
const quickResultKey = 'quickresult';
var quickResult = JSON.parse(localStorage.getItem(quickResultKey));
if (!quickResult) {
  quickResult = {
    from: [],
    to: []
  }
}

const deviationKey = 'deviation';
var deviationGids = JSON.parse(localStorage.getItem(deviationKey)) || [];

function updateQuickResultCounter(list, obj) {
  let foundFrom = list.find(listObj => obj.Name === listObj.Name);
  if (foundFrom) {
    foundFrom.count++;
    foundFrom.date.push(+new Date());
  } else {
    obj.count = 1;
    obj.date = [+new Date()]
    list.push(obj);
  }
}

function handleQuickResult(fromObj, toObj) {
  updateQuickResultCounter(quickResult.from, fromObj);
  updateQuickResultCounter(quickResult.to, toObj);
}

const getSearchPartFromObj = (prefix, obj) => {
  if (obj.Type === 'Address') {
    let keyCoordLat = prefix + 'CoordLat';
    let keyCoordLong = prefix + 'CoordLong';
    let keyCoordName = prefix + 'CoordName';
    return {
      [keyCoordLat]: obj.Y / 1000000,
      [keyCoordLong]: obj.X / 1000000,
      [keyCoordName]: obj.Name
    }
  } else {
    let key = prefix + 'Id'
    return { [key]: obj.SiteId || obj.Name }
  }
}

const searchStore = {
  fetch: (fromObj, toObj) => {
    handleQuickResult(fromObj, toObj);
    localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
    return new Promise((resolve, reject) => {
      let searchObj = {};
      Object.assign(searchObj, getSearchPartFromObj('origin', fromObj));
      Object.assign(searchObj, getSearchPartFromObj('dest', toObj));
      axios.post('api/search', searchObj).then(data => {
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
  deviations: async searchObj => {
    let data = await axios.post('api/deviations', searchObj);
    console.log(data);
    return data.data;
  },
  deviationGids,
  archiveDeviation: deviation => {
    deviationGids.push(deviation.DevCaseGid);
    localStorage.setItem(deviationKey, JSON.stringify(deviationGids));
  },
  getResult: () => result,
  quickResult: () => quickResult
}
export default searchStore
