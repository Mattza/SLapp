<template>
  <div>
    <div class="searcher">
      <h1>Sök störningar</h1>
      <h3>Fyll i den linjen du vill ha information om!</h3>
      <input type="number" @input="onChange($event.target.value)" />
    </div>
    <div class="result">
      <div class="result-item" v-for="deviation in deviations" :key="deviation.DevCaseGid" v-if="!deviationGids.includes(deviation.DevCaseGid)">
        <h3>{{deviation.Header}}</h3>
        <p>{{time(deviation.FromDateTime)}} - {{time(deviation.UpToDateTime)}}</p>
        <p>Gäller {{deviation.Scope}}</p>
        <p>{{deviation.Details}}</p>
        <button class="btn btn-primary" @click="archive(deviation)">Arkivera</button>
      </div>
    </div>
  </div>
</template>
<script>
import deviationStore from './../DeviationStore';

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
      deviations: deviationStore.deviations(),
      deviationGids: deviationStore.deviationGids
    }
  },
  methods: {
    onChange: debounce(async function (value) {
      this.deviations = await deviationStore.deviations({ lineNumber: value })
    }, 500),
    archive(item) {
      deviationStore.archiveDeviation(item);
    },
    time(deviationTime) {
      let [date, time] = deviationTime.split('T');
      let [year, month, day] = date.split('-');
      if (year === '' + new Date().getFullYear()) {
        let monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
        date = day + ' ' + monthShort[parseInt(month) - 1];
      }
      return `${date} ${time.slice(0, 5)}`;
    }
  }
}
</script>
<style scoped lang="scss">
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