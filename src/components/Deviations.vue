<template>
  <div>
    <div class="searcher">
      <h1>Sök störningar</h1>
      <h3>Fyll i den linjen du vill ha information om!</h3>
      <input type="number" @input="onChange" />
    </div>
    <div class="result">
      <div class="result-item" v-for="deviation in deviations" :key="deviation.DevCaseGid" v-if="!deviationGids.includes(deviation.DevCaseGid)">
        <h3>
          {{deviation.Header}}
        </h3>
        <p>{{time(deviation.FromDateTime)}} - {{time(deviation.UpToDateTime)}}</p>
        <p>Gäller {{deviation.Scope}}</p>
        <p>
          {{deviation.Details}}
        </p>
      </div>
  
    </div>
  </div>
</template>
<script>
import searchStore from './../SearchStore';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default {
  name: 'deviations',
  props: ['list'],
  data() {
    return {
      deviations: undefined,
      deviationGids: searchStore.deviationGids
    }
  },
  methods: {
    onChange: debounce(function (e) {
      searchStore.deviations({ lineNumber: e.target.value }).then(res => {
        this.deviations = res;
      })
    }, 500),
    archive(item) {
      searchStore.archiveDeviation(item);
    },
    time(time) {
      let split = time.split('T');
      if (split[0].slice(0, 4) === '' + new Date().getFullYear()) {
        let split2 = split[0].split('-');
        let monthShort = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'
        ]

        split[0] = split2[2] + ' ' + monthShort[parseInt(split2[1]) - 1];
      }
      return `${split[0]} ${split[1].slice(0, 5)}`;
    }
  },
  created() {
    searchStore.deviations().then(res => {
      this.deviations = res;
    })
  }
}
</script>

<style lang="scss">
.result {
  background-color: #ddd;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  height: 100%;

  &-item {
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25em;
    background-color: #fff;
  }
  .preview {
    &-head {
      display: flex;
    }
  }
}
</style>