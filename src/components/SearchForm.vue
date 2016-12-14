<template>
  <div>
    <form v-on:submit.prevent="search()">
      <input type="text" v-model="model.from" placeholder="Från" />
      <div class="quick-wrapper">
        <button class="btn btn-default" type="button" v-on:click="selectQuick('from',quick)"  v-for="quick in quickResult.from">{{quick}}</span>
      </div>
      
      <input type="text" v-model="model.to" placeholder="Till" />
       <div class="quick-wrapper">
        <button class="btn btn-default" type="button" v-on:click="selectQuick('to',quick)"  v-for="quick in quickResult.to">{{quick}}</span>
      </div>
      <button class="btn btn-primary" v-bind:disabled="searching">Sök</button>
    </form>
    </div>
</template>

<script>
import searchStore from './../SearchStore';
export default {
  name: 'searchForm',
  data () {
    return {
      model: {
        from: '',
        to: ''
      },
      quickResult: searchStore.quickResult(),
      searching: false
    }
  },
  methods: {
    selectQuick (key, val) {
      this.model[key] = val;
    },
    search () {
      this.searching = true;
      searchStore.fetch({destId: this.model.to, originId: this.model.from})
        .then(() => {
          this.searching = false;
          this.$routz.replace('/search-result');
        })
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
    width:30%;
    overflow: hidden;
  }

</style>