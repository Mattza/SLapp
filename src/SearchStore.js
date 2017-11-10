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

function updateQuickResultCounter(list, obj) {
  let foundFrom = list.find(item => obj.Name === item.Name);
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
    return {
      [prefix + 'CoordLat']: obj.Y / 1000000,
      [prefix + 'CoordLong']: obj.X / 1000000,
      [prefix + 'CoordName']: obj.Name
    }
  } else {
    return { [prefix + 'Id']: obj.SiteId || obj.Name }
  }
}

let currentSearch;
let fetch = async function (searchObj) {
  let data = (await axios.post('api/search', searchObj)).data;
  return data.map(item => Object.assign(item, { detailed: false }));
}

let nextMinute = (time) => {
  let now = new Date(`${new Date().toISOString().split('T')[0]}T${time}Z`);
  now.setMinutes(now.getMinutes() + 1)
  return now.toISOString().split('T')[1].slice(0, 5);
}

const searchStore = {
  fetch: async (fromObj, toObj) => {
    currentSearch = { fromObj, toObj };
    handleQuickResult(fromObj, toObj);
    localStorage.setItem(quickResultKey, JSON.stringify(quickResult));
    let searchObj = {};
    Object.assign(searchObj, getSearchPartFromObj('origin', fromObj));
    Object.assign(searchObj, getSearchPartFromObj('dest', toObj));
    result = await fetch(searchObj);
  },
  fetchLater: async () => {
    if (currentSearch && result) {
      let { date, time } = result[result.length - 1].LegList.Leg[0].Origin;
      let searchObj = {};
      Object.assign(searchObj, getSearchPartFromObj('origin', currentSearch.fromObj));
      Object.assign(searchObj, getSearchPartFromObj('dest', currentSearch.toObj));
      searchObj.date = date;
      searchObj.time = nextMinute(time)
      let newResult = await fetch(searchObj)
      result = result.concat(newResult);
      return result;
    }
  },
  typeahead: async str => (await axios.post('api/typeahead', { 'searchstring': str })).data,
  getResult: () => result,
  quickResult: () => quickResult,
  firstTime
}
export default searchStore
