<template>
  <div>
    <div class="onboarding" v-if="firstTime">
      <h3>Välkommen till den smarta SL-appen!</h3>
      <p>Denna app kommer successivt lära sig hur du söker och kommer kunna föreslå resmål.</p>
      <p></p>
    </div>
    <form @submit.prevent="search()">
      <search-input @modelChange="changeModel('from', $event)" :placeholder="'Från'" :quickResult="quickResult.from"></search-input>
      <search-input @modelChange="changeModel('to', $event)" :placeholder="'Till'" :quickResult="quickResult.to"></search-input>
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
      firstTime: searchStore.firstTime,
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
          .then(res => {
            this.searching = false;
            this.$routz.push('/resultat');
          },
          error => {
            this.error = error;
            this.searching = false;
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
  margin: 1.25rem;
}

button:disabled {
  opacity: 0.5;
}
</style>