/* global localStorage */
import axios from 'axios'
let deviationGids = JSON.parse(localStorage.getItem('deviation')) || [];

export default {
  deviations: async searchObj => (await axios.post('api/deviations', searchObj)).data,
  deviationGids,
  archiveDeviation: ({DevCaseGid}) => {
    deviationGids.push(DevCaseGid);
    localStorage.setItem('deviation', JSON.stringify(deviationGids));
  }
}
