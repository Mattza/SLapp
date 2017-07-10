<template>
  <div>
    <form v-on:submit.prevent="search()">
      <div class="field-wrapper">
        <input type="text" v-model="model.from.Name" placeholder="Från" @input="changed('from')" @keydown.esc="reset('from')" @blur="reset('from')" @keydown.down="setActive('from',1)" @keydown.enter.prevent="selectTypeahead('from',model.fromTypeaheadsActiveItem)" @keydown.up="setActive('from',-1)"></input>
        <ul v-show="model.fromTypeaheads.length || model.fromTypeaheadsSearching" class="typeahead-result">
          <li v-if="model.fromTypeaheadsSearching">Söker</li>
          <li v-for="item in model.fromTypeaheads" class="typeahead-result-item" @mousedown="selectTypeahead('from',item)" @mouseover="setActive('from',0,item)" :class="{'typeahead-result-item--active': item === model.fromTypeaheadsActiveItem}">
            {{item.Name}}
          </li>
        </ul>
        <quick-result :list="quickResult.from" :prop="'from'" @select="selectQuick"></quick-result>
      </div>
      <div class="field-wrapper">
        <input type="text" v-model="model.to.Name" placeholder="Till" @input="changed('to')" @keydown.esc="reset('to')" @blur="reset('to')" @keydown.down="setActive('to',1)" @keydown.enter.prevent="selectTypeahead('to',model.toTypeaheadsActiveItem)" @keydown.up="setActive('to',-1)"></input>
        <ul v-show="model.toTypeaheads.length || model.toTypeaheadsSearching" class="typeahead-result">
          <li v-if="model.toTypeaheadsSearching">Söker</li>
          <li v-for="item in model.toTypeaheads" class="typeahead-result-item" @mousedown="selectTypeahead('to',item)" @mouseover="setActive('to',0,item)" :class="{'typeahead-result-item--active': item === model.toTypeaheadsActiveItem}">
            {{item.Name}}
          </li>
        </ul>
        <quick-result :list="quickResult.to" :prop="'to'" @select="selectQuick"></quick-result>
      </div>
      <button class="btn btn-primary" v-bind:disabled="searching">Sök</button>
      <p v-if="searching">Söker</p>
      <p v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import searchStore from './../SearchStore';
import quickResult from './QuickResult';

export default {
  name: 'searchForm',
  components: {
    'quick-result': quickResult
  },
  data() {
    return {
      model: {
        from: { Name: '' },
        fromTypeaheads: [],
        fromTypeaheadsActiveItem: undefined,
        fromTypeaheadsSearching: false,
        to: { Name: '' },
        toTypeaheads: [],
        toTypeaheadsActiveItem: undefined,
        toTypeaheadsSearching: false
      },
      quickResult: searchStore.quickResult(),
      searching: false,
      error: ''
    }
  },

  methods: {
    reset(key) {
      this.model[key + 'Typeaheads'].splice(0, this.model[key + 'Typeaheads'].length);
    },
    selectQuick({ prop, item }) {
      this.model[prop] = item;

      if (this.model.from.Name && this.model.to.Name) {
        this.search();
      }
    },
    selectTypeahead(key, item) {
      this.model[key] = item;
    },
    setActive(key, direction, item) {
      if (item) {
        this.model[key + 'TypeaheadsActiveItem'] = item;
      }
      if (direction) {
        if (!this.model[key + 'TypeaheadsActiveItem']) {
          this.model[key + 'TypeaheadsActiveItem'] = this.model[key + 'Typeaheads'][0];
        }

        let index = this.model[key + 'Typeaheads'].indexOf(this.model[key + 'TypeaheadsActiveItem']);
        this.model[key + 'TypeaheadsActiveItem'] = this.model[key + 'Typeaheads'][index + direction];
      }
    },
    search() {
      if (this.model.from.Name && this.model.to.Name) {
        this.searching = true;
        searchStore.fetch(this.model.from, this.model.to)
          .then(() => {
            this.searching = false;
            this.$routz.replace('/search-result');
          },
          error => {
            this.error = error;
          })
      }
    },
    stationSearch(str) {
      return searchStore.typeahead(str);
    },
    changed(key) {
      this.model[key] = { Name: this.model[key].Name };
      console.log('change', this.model[key]);
      if (this.model[key].Name.length > 2) {
        this.model[key + 'TypeaheadsSearching'] = true;
        this.stationSearch(this.model[key].Name).then(data => {
          this.model[key + 'Typeaheads'] = data;
          this.model[key + 'TypeaheadsActiveItem'] = this.model[key + 'Typeaheads'][0];
          this.model[key + 'TypeaheadsSearching'] = false;
        }, error => {
          this.model[key + 'TypeaheadsSearching'] = false;
          this.error = error;
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  margin: 20px;
}



button:disabled {
  opacity: 0.5;
}

.field-wrapper {
  position: relative;
}

.typeahead-result {
  position: absolute;
  padding: 0;
  top: 2rem;
  max-width: 20rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .25);
  z-index: 1000;
  max-height: 20rem;
  overflow: auto
}

.typeahead-result-item {
  padding: 1em;
  font-size: 1rem;
  border-bottom: 1px solid #ccc;
}

.typeahead-result-item--active {
  background-color: #ccc;
}
</style>
