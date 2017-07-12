<template>
  <div>
    <form v-on:submit.prevent="search()">
  
      <search-input @modelChange="changeModel('from',$event)" :placeholder="'Från'" :quickResult="quickResult.from"></search-input>
      <search-input @modelChange="changeModel('to',$event)" :placeholder="'Till'" :quickResult="quickResult.to"></search-input>
  
      <button class="btn btn-primary" :disabled="searching || !searchEnabled">Sök</button>
      <p v-if="searching">Söker</p>
      <p v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import searchStore from './../SearchStore';
import searchInput from './SearchInput';

export default {
  name: 'searchForm',
  components: {
    'search-input': searchInput
  },
  data() {
    return {
      quickResult: searchStore.quickResult(),
      model: {
        from: undefined,
        to: undefined
      },
      searching: false,
      error: ''
    }
  },
  computed: {
    searchEnabled: function () {
      return this.model.from && this.model.from.Name && this.model.to && this.model.to.Name;
    }
  },
  methods: {
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
    changeModel(key, val) {
      this.model[key] = val;
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
</style>
