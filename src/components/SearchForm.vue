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
  
        <div class="quick-wrapper">
          <button class="btn btn-default" type="button" v-on:click="selectQuick('from',quick)" v-for="quick in quickResult.from">{{quick.Name}}</button>
        </div>
      </div>
      <div class="field-wrapper">
        <input type="text" v-model="model.to.Name" placeholder="Till" @input="changed('to')" @keydown.esc="reset('to')" @blur="reset('to')" @keydown.down="setActive('to',1)" @keydown.enter.prevent="selectTypeahead('to',model.toTypeaheadsActiveItem)" @keydown.up="setActive('to',-1)"></input>
        <ul v-show="model.toTypeaheads.length || model.toTypeaheadsSearching" class="typeahead-result">
          <li v-if="model.toTypeaheadsSearching">Söker</li>
          <li v-for="item in model.toTypeaheads" class="typeahead-result-item" @mousedown="selectTypeahead('to',item)" @mouseover="setActive('to',0,item)" :class="{'typeahead-result-item--active': item === model.toTypeaheadsActiveItem}">
            {{item.Name}}
          </li>
        </ul>
        <div class="quick-wrapper">
          <button class="btn btn-default" type="button" v-on:click="selectQuick('to',quick)" v-for="quick in quickResult.to">{{quick.Name}}</button>
        </div>
      </div>
      <button class="btn btn-primary" v-bind:disabled="searching">Sök</button>
      <p v-if="searching">Söker</p>
      <p v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import searchStore from './../SearchStore';

export default {
  name: 'searchForm',
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
      console.log('reset', key);
      this.model[key + 'Typeaheads'].splice(0, this.model[key + 'Typeaheads'].length);
    },
    selectQuick(key, item) {
      this.model[key] = item;
    },
    selectTypeahead(key, item) {
      console.log('selectTypeahead', key, item);
      this.model[key] = item;
    },
    setActive(key, direction, item) {
      console.log('setActive', key, direction, item)
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
      this.searching = true;
      searchStore.fetch(this.model.from, this.model.to)
        .then(() => {
          this.searching = false;
          this.$routz.replace('/search-result');
        },
        error => {
          this.error = error;
        })
    },
    stationSearch(str) {
      return searchStore.typeahead(str);
    },
    changed(key) {
      this.model[key] = { Name: this.model[key].Name };
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

input[type="text"] {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 2.4375rem;
  padding: 0.5rem;
  border: 1px solid #cacaca;
  margin: 0 0 1rem;
  font-family: inherit;
  font-size: 1rem;
  color: #0a0a0a;
  background-color: #fefefe;
  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  border-radius: 0;
  -webkit-transition: -webkit-box-shadow 0.5s, border-color 0.25s ease-in-out;
  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="text"]:focus {
  border: 1px solid #8a8a8a;
  background-color: #fefefe;
  outline: none;
  -webkit-box-shadow: 0 0 5px #cacaca;
  box-shadow: 0 0 5px #cacaca;
  -webkit-transition: -webkit-box-shadow 0.5s, border-color 0.25s ease-in-out;
  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
}

.btn {
  display: inline-block;
  text-align: center;
  line-height: 1;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-transition: background-color 0.25s ease-out, color 0.25s ease-out;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: 0;
  padding: 0.85em 0;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #2199e8;
  color: #fefefe;
}

.btn-default {
  background-color: #fefefe;
  color: #2199e8;
  border: 1px solid #2199e8;
}

button:disabled {
  opacity: 0.5;
}

.quick-wrapper {
  display: flex;
  justify-content: space-between;
}

button {
  width: 30%;
  overflow: hidden;
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