<template>
  <ul class="result">
    <li v-for="res in result" v-on:click="res.detailed=!res.detailed" class="result-item">
      <div class="preview">
        <div>
          <h3>
            {{res.LegList|time}} {{res.dur}} min
          </h3>
          <div class="preview-sub">
            <h5>
              <span>{{res|origin}}</span>
              <span>-</span>
              <span>{{res|destination}}</span>
            </h5>
            <div class="preview-sub-leg" v-for="part in getRealLegs(res)">
              <img v-bind:src="part.type | typeImg" class="preview-sub-leg-img"></img>
              <span class="preview-sub-leg-text">{{part.line}}</span>
            </div>
          </div>
        </div>
        <button class="expander">+</button>
      </div>
      <div class="body" v-show="res.detailed">
        <template v-for="part in getRealLegs(res)">
          <div v-bind:alt="part.name" class="body-leg">
            <p class="time">{{part.Origin.time}}</p>
            <div class="body-leg__icon">
              <img v-bind:src="part.type | typeImg" class="body-leg__icon-img">
              <span class="body-leg__icon-text">{{part.line}}</span>
              </img>
            </div>
            <div>
              <p>Mot: {{part.dir}}</p>
              <p v-if="part !== res.LegList.Leg[res.LegList.Leg.length-1]">Byt vid: {{part.Destination.name}}</p>
            </div>
          </div>
  
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
<style scoped lang="scss">
h3,
h5,
p {
  margin: 0;
}

.result {
  list-style-type: none;
  padding: 0;
  margin: 0;

  &-item {
    margin: 0 10px;
    padding: 10px 0;
    border-bottom: 1px solid black;
  }
}

.preview {
  position: relative;
  &-sub {
    margin-right: 2em;
    display: flex;
    align-items: center;
    justify-content: center;

    &-leg {
      margin: 0 0.5rem;
      position: relative;
      &-img {
        width: 2rem;
      }
      &-text {
        position: absolute;
        top: calc(50%);
        left: 0;
        right: 0;
        font-size: 0.7em;
      }
    }
  }
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;

  &-leg {
    display: flex;
    align-items: center;
    position: relative;

    &>*{
      margin:0.5rem;
    }

    &__icon {
      position: relative;
      &-img {
        width: 3rem;
      }
      &-text {
        position: absolute;
        top: calc(50%);
        left: 0;
        right: 0;
        font-size: 1.05em;
      }
    }
  }
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