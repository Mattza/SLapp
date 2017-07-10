<template>
  <ul>
    <li v-for="res in result" v-on:click="res.detailed=!res.detailed">
      <div class="header">
        <div>
          <h3>
            {{res.LegList|time}} {{res.dur}} min
          </h3>
          <h5>
            <span>{{res|origin}}</span>
            <span>-</span>
            <span>{{res|destination}}</span>
          </h5>
        </div>
        <button class="expander">+</button>
      </div>
      <div class="legList" v-show="res.detailed">
        <template v-for="part in getRealLegs(res)">
          <div v-bind:alt="part.name">
            <img v-bind:src="part.type | typeImg" width="50"></img>
            <p class="time">{{part.Origin.time}}</p>
            <span class="line">{{part.line}}</span>
          </div>
          <p class="middle-station" v-if="part !== res.LegList.Leg[res.LegList.Leg.length-1]">{{part.Destination.name}}</p>
        </template>
      </div>
    </li>
  </ul>
</template>
<script>
import SearchStore from './../SearchStore.js';

export default {
  name: 'searchResult',
  data() {
    return {
      result: SearchStore.getResult(),
      getRealLegs: res => res.LegList.Leg.filter(leg => leg.type !== 'WALK')
    }
  },
  filters: {
    origin: res => res.LegList.Leg[0].Origin.name,
    destination: res => res.LegList.Leg[res.LegList.Leg.length - 1].Destination.name,
    time: res => `${res.Leg[0].Origin.time} ⇒ ${res.Leg[res.Leg.length - 1].Destination.time}`,
    typeImg: res => `static/${res}-icon.svg`
  },
  created() {
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
  margin: 0;
}

li {
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid black;
}

.legList {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.legList>* {
  position: relative;
  padding: 5px;
}

.line {
  position: absolute;
  top: 33px;
  left: 0;
  right: 0;
}

h3 {
  margin: 5px;
}

h5,
p {
  margin: 0;
}

.header {
  position: relative;
}

.expander {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  background-color: #03a9f4;
  border: 0;
}

.type-icon {
  width: 3rem;
  height: 3rem;
}
</style>