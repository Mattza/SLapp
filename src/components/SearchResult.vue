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
        <span>{{res|time}}</span>
      </h5>

      <!--<span v-for="station in (res|tripStr)">{{station}}</span>-->
      <!--<span>{{res.LegList.Leg[0].Origin.name}}</span>-->
      <!--<span v-for="leg in res.LegList.Leg">{{leg.Destination.name}}</span>-->
    </li>
  </ul>

</template>

<script>
import SearchStore from './../SearchStore.js';
// import router from './../main.js';
// console.log('router', router);
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
    time: res => {
      return res.LegList.Leg[0].Origin.time + ' >> ' + res.LegList.Leg[res.LegList.Leg.length - 1].Destination.time + ' ' + res.dur + 'min'
    },
    parttype: item => {
      console.log('type', item);
      return `${item.type} ${item.dir}`;
    },
    fullTripStr: (legs) => {
      var ret = [legs.LegList.Leg[0].Origin.name];
      legs.LegList.Leg.forEach(item => {
        if (ret[ret.length - 1] !== item.Destination.name) {
          ret.push(item.Destination.name);
        }
      })
      return ret;
    }
  },
  created () {
    if (this.result.length === 0) {
      console.log('no dataz');
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