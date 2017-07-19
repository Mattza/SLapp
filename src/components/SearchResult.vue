<template>
  <ul class="result">
    <li v-for="res in result" v-on:click="res.detailed=!res.detailed" class="result-item">
      <div class="preview">
        <div class="preview-head">
          <h3>
            {{res.LegList|time}}
          </h3>
          <h5>
            <div class="no-break">{{res|origin}}</div>
            <div class="no-break">{{res|destination}}</div>
          </h5>
  
          <button class="expander" v-if="!res.detailed">+</button>
          <button class="expander expanderus" v-if="res.detailed">
            <span>-</span>
          </button>
  
        </div>
        <div class="preview-sub">
          <h4>
            {{res.dur}} min
          </h4>
          <div class="preview-legs">
            <div class="preview-leg" v-for="part in getRealLegs(res)">
              <img v-bind:src="part.type | typeImg" class="preview-leg-img"></img>
              <span class="preview-leg-text">{{part.line}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="body" v-show="res.detailed">
        <template v-for="part in getRealLegs(res)">
          <div v-bind:alt="part.name" class="body-leg">
            <div class="body-leg__first-col">
              <div class="body-leg__icon">
                <img v-bind:src="part.type | typeImg" class="body-leg__icon-img">
                <span class="body-leg__icon-text">{{part.line}}</span>
                </img>
              </div>
              <div>
                <p class="time">{{part.Origin.time}}</p>
                <p class="time">{{part.Destination.time}}</p>
              </div>
            </div>
            <table class="body-leg__extras">
              <tr>
                <td><small>Mot:</small></td>
                <td>
                  <h5>{{part.dir}}</h5>
                </td>
              </tr>
              <tr v-if="part !== res.LegList.Leg[res.LegList.Leg.length-1]">
                <td><small>Byt vid:</small></td>
                <td>
                  <h5>{{part.Destination.name}}</h5>
                </td>
              </tr>
            </table>
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
$first-col:9rem;
h3,
h4,
h5,
p {
  margin: 0;
  text-align: left;
}

h5 {
  margin-left: -1px;
}

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
    background-color: #fff;
  }
}

.preview {
  position: relative;
  &-head>:first-child,
  &-sub>:first-child {
    width: $first-col;
    flex-shrink: 0;
  }

  &-head {
    display: flex;

    h5 {
      max-width: calc(100% - 185px);
      overflow: hidden;
    }
  }

  &-sub {
    display: flex;
    overflow: hidden;
    align-items: center;
  }

  &-legs {
    display: flex;
    flex-grow: 0;
    padding: 0.5em;
  }

  &-leg {
    margin-right: 1rem;
    position: relative;
    height: 2rem;

    &:last-child {
      margin-right: 0;
    }

    &-img {
      width: 2rem;
    }

    &-text {
      position: absolute;
      top: calc(55%);
      left: 0;
      right: 0;
      font-size: 0.7em;
    }
  }
}

.body {
  background-color: #eee;
  margin: 0.5rem -0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-leg {
    display: flex;
    align-items: center;
    position: relative;


    &>* {}

    &__first-col {
      width: $first-col;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    &__icon {
      position: relative;
      margin-right: 1rem;

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
    &__extras {
      text-align: left;
      td:first-child {
        width: 4rem;
      }
    }
  }
}

td {
  padding: 0;
}

table {
  margin-left: -3px;
}

.expander {
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  background-color: #03a9f4;
  color: #fff;
  border: 0;
  margin-left: auto;
  &--minus {
    font-size: 2rem;
    >* {
      margin-top: -6px;
      display: block;
    }
  }
}

.time {
  font-weight: bold;
}
</style>