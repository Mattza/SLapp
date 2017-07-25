<template>
  <div>
    <h1>Mina stationer</h1>
    <div class="result">
      <div v-for="result in stations" @click="remove(result)" class="result-item">
        <div class="preview">
          <div class="preview-head">
            <h3>{{result.Name}}</h3>
            <button class="expander">
              <img src="static/trash-can.svg" @click="openLeft()" />
            </button>
          </div>
          <div class="preview-body">
            <p v-if="result.fromDate">Åkt från: {{result.fromDate.length}} gånger</p>
            <p v-if="result.toDate">Åkt till: {{result.toDate.length}} gånger</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import searchStore from './../SearchStore';

let convertObj = (item, dateKey) => ({ Name: item.Name, SiteId: item.SiteId, [dateKey]: item.date })

export default {
  name: 'mytrips',
  props: ['list'],
  data() {
    return {
      quickResult: searchStore.quickResult()
    }
  },
  computed: {
    stations: function () {
      let arr = [];
      this.quickResult.from.forEach(item => {
        arr.push(convertObj(item, 'fromDate'))
      })
      let SiteIds = this.quickResult.from.filter(item => !!item.SiteId).map(item => item.SiteId);
      let Names = this.quickResult.from.map(item => item.Name);
      this.quickResult.to.forEach(item => {
        if (item.SiteId) {
          if (SiteIds.includes(item.SiteId)) {
            arr.find(arrs => arrs.SiteId === item.SiteId).toDate = item.date;
          } else {
            SiteIds.push(item.SiteId);
            arr.push(convertObj(item, 'toDate'));
          }
        } else if (item.Name) {
          if (Names.includes(item.Name)) {
            arr.find(arrs => arrs.Name === item.Name).toDate = item.date;
          } else {
            Names.push(item.Name);
            arr.push(convertObj(item, 'toDate'));
          }
        }
      });
      return arr;
    }
  },
  methods: {
    remove(item) {
      console.log(item);
    }
  }
}
</script>

<style lang="scss">
h3 {
  margin: 0;
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
    border-radius: 0.25em;
    background-color: #fff;
  }
  .preview {
    &-head {
      display: flex;
    }
  }
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

  img {
    width: 1.25rem;
    margin-top: 0.17em
  }
}
</style>