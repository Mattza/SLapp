/* global localStorage */
import axios from 'axios'

let currentlocalStorageVersion = '0.2';
let storedVersion = localStorage.getItem('localStorageVersion');
if (currentlocalStorageVersion !== storedVersion) {
  localStorage.clear();
  localStorage.setItem('localStorageVersion', currentlocalStorageVersion);
}
let firstTime = !storedVersion;
var result = [];
const quickResultKey = 'quickresult';
var quickResult = JSON.parse(localStorage.getItem(quickResultKey));
if (!quickResult) {
  quickResult = {
    from: [{ Name: 'T-centralen', date: [] }, { Name: 'Slussen', date: [] }, { Name: 'Sundbyberg', date: [] }],
    to: [{ Name: 'T-centralen', date: [] }, { Name: 'Slussen', date: [] }, { Name: 'Sundbyberg', date: [] }]
  }
  localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
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

let currentSearch;
let fetch = (searchObj) => new Promise((resolve, reject) => {
  axios.post('api/search', searchObj).then(data => {
    resolve(data.data.map(i => Object.assign(i, { detailed: false })));
  })
})

const searchStore = {
  fetch: (fromObj, toObj, others) => {
    currentSearch = { fromObj, toObj, others };
    handleQuickResult(fromObj, toObj);
    localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
    let searchObj = {};
    Object.assign(searchObj, getSearchPartFromObj('origin', fromObj));
    Object.assign(searchObj, getSearchPartFromObj('dest', toObj));
    let prom = fetch(searchObj)
    prom.then(data => {
      result = data
    })
    return prom;
  },
  fetchLater: () => {
    if (currentSearch && result) {
      let { date, time } = result[result.length - 1].LegList.Leg[0].Origin;
      let searchObj = {};
      Object.assign(searchObj, getSearchPartFromObj('origin', currentSearch.fromObj));
      Object.assign(searchObj, getSearchPartFromObj('dest', currentSearch.toObj));
      searchObj.date = date;
      let now = new Date(`${date}T${time}Z`);
      now.setMinutes(now.getMinutes() + 1)
      searchObj.time = now.toISOString().split('T')[1].slice(0, 5);
      let prom = fetch(searchObj)
      prom.then(data => {
        data.forEach(item => result.push(item));
      });
      return prom;
    }
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
    return data.data;
  },
  deviationGids,
  archiveDeviation: deviation => {
    deviationGids.push(deviation.DevCaseGid);
    localStorage.setItem(deviationKey, JSON.stringify(deviationGids));
  },
  getResult: () => result,
  quickResult: () => quickResult,
  firstTime
}
export default searchStore
