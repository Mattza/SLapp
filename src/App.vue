<template>
  <div id="app">
    <header>
      <h1>SLapp</h1>
    </header>
     <router-view></router-view>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm'
import SearchResult from './components/SearchResult'

export default {
  name: 'app',
  components: {
    SearchForm,
    SearchResult
  }
}
</script>

<style>
  body {
    margin: 0;
  }
  
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  
  header {
    padding: 10px;
    background-color: #03a9f4;
    color: #fefefe;
  }
</style>