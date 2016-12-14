<template>
  <ul>
    <li v-for="res in result">
      <h3>
        <span>
          {{res.LegList|time}}
          {{res.dur}} min
          </span>
      </h3>
      <h5>
        <span>{{res|origin}}</span>
        <span>-</span>
        <span>{{res|destination}}</span>
      </h5>
      <div class="legList">
        <div v-for="part in res.LegList.Leg" v-if="part.type!=='WALK'" v-bind:alt="part.name">

          <img v-bind:src="part.type | typeImg" width="50" />
          <p class="time">{{part.Origin.time}}</p>
          <span class="line">{{part.line}}</span>
        </div>
        <!--<h3 v-for="part in res.LegList.Leg">
        {{part.type}} {{part.dir}}
      </h3>-->

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
    time: res => `${res.Leg[0].Origin.time} >> ${res.Leg[res.Leg.length - 1].Destination.time}`,
    typeImg: res => `static/${res}.svg`
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
  
  .legList {
    display: flex;
    justify-content: center;
  }
  
  .legList > * {
    position: relative;
    padding: 5px;
  }
  
  .line {
    position: absolute;
    top: 27px;
    left: 32px;
  }
  
 
  h5,
  p {
    margin: 0;
  }
</style>