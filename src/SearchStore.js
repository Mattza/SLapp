import axios from 'axios'

var result = [];
const searchStore = {
  fetch: searchObj => {
    return new Promise((resolve, reject) => {
      axios.post('api/search', searchObj).then(data => {
        result = data.data;
        resolve(result);
      })
    })
  },
  get: () => result
}
export default searchStore
