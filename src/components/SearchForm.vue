<template>
  <div>
    <form v-on:submit="search()">
      <input v-model="model.from" placeholder="Från" />
      <input v-model="model.to" placeholder="Till" />
      <button>Sök</button>
    </form>
  </div>
</template>

<script>
// import router from './../main.js';

import searchStore from './../SearchStore';
export default {
  name: 'searchForm',
  data () {
    return {
      model: {
        from: '',
        to: ''
      }
    }
  },
  methods: {
    search () {
      searchStore.fetch({destId: this.model.to, originId: this.model.from})
        .then(() => {
          console.log('navigate');
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
  
  input {
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
  
  input:focus {
    border: 1px solid #8a8a8a;
    background-color: #fefefe;
    outline: none;
    -webkit-box-shadow: 0 0 5px #cacaca;
    box-shadow: 0 0 5px #cacaca;
    -webkit-transition: -webkit-box-shadow 0.5s, border-color 0.25s ease-in-out;
    transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
  }
  
  button {
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
    padding: 0.85em 1em;
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    background-color: #2199e8;
    color: #fefefe;
  }
</style>