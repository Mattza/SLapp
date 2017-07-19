<template>
  <div>
    <input />
    <ul>
      <li v-for="deviation in deviations" :key="deviation.DevCaseGid" v-if="!deviationGids.includes(deviation.DevCaseGid)" @click="archive(deviation)">
        <h3>
          {{deviation.Header}}
        </h3>
        <p>
          {{deviation.Details}}
        </p>
        {{deviation}}
      </li>
    </ul>
  </div>
</template>
<script>
import searchStore from './../SearchStore';
// let deviationGids = searchStore.deviationGids;
// console.log(deviationGids)

// let getDeviations = async () => {
//   let data = await searchStore.deviations({ lineNumber: 35 });
//   data.data.forEach(item => deviations.push(item))
// }

// getDeviations();

export default {
  name: 'deviations',
  props: ['list'],
  data() {
    return {
      deviations: searchStore.deviations({ lineNumber: 35 }),
      deviationGids: searchStore.deviationGids
    }
  },
  methods: {
    archive(item) {
      searchStore.archiveDeviation(item);
    }
  }
}
</script>

<style>

</style>