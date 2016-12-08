<template>
  <ul>
    <li v-for="res in result">
      <h3>
        <span>{{res|origin}}</span>
        <span>-</span>
        <span>{{res|destination}}</span>
      </h3>
      <h4 v-for="part in res.LegList.Leg">
        {{part.type}} {{part.dir}}
      </h4>
      <h5>
        <span>
          {{res.LegList|time}}
          {{res.dur}} min
          </span>
      </h5>
    </li>
  </ul>
</template>
<script>
import SearchStore from './../SearchStore.js';

export default {
  name: 'searchResult',
  data () {
    return {
      result: SearchStore.get()
    }
  },
  filters: {
    origin: res => res.LegList.Leg[0].Origin.name,
    destination: res => res.LegList.Leg[res.LegList.Leg.length - 1].Destination.name,
    time: res => `${res.Leg[0].Origin.time} >> ${res.Leg[res.Leg.length - 1].Destination.time}`
  },
  created () {
    if (this.result.length === 0) {
      this.$routz.push('search')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 0 10px;
    border-bottom: 1px solid black;
  }
</style>