<template>
  <div class="field-wrapper">
    <input type="text" v-model="model.Name" :placeholder="placeholder" @input="changed()" @keydown.esc="reset()" @blur="reset()" @keydown.down="setActive(1)" @keydown.enter.prevent="selectTypeahead()" @keydown.up="setActive(-1)"></input>
    <ul v-show="typeaheadList.length || searching" class="typeahead-result">
      <li v-if="searching">Söker</li>
      <li v-for="item in typeaheadList" class="typeahead-result-item" @mousedown="selectTypeahead(item)" @mouseover="setActive(0,item)" :class="{'typeahead-result-item--active': item === active}">
        {{item.Name}}
      </li>
    </ul>
    <quick-result :list="quickResult" @select="setModel"></quick-result>
  </div>
</template>
<script>
import searchStore from './../SearchStore';
import quickResult from './QuickResult';

export default {
  name: 'search-input',
  components: {
    'quick-result': quickResult
  },
  props: ['placeholder', 'quickResult'],
  data() {
    return {
      typeaheadList: [],
      active: undefined,
      searching: false,
      model: { Name: '' }
    }
  },
  watch: {
    model: {
      handler: function (val) {
        this.$emit('modelChange', this.model)
      },
      deep: true
    }
  },
  methods: {
    changed() {
      if (this.model.Name.length > 2) {
        this.searching = true;
        searchStore.typeahead(this.model.Name).then(data => {
          this.typeaheadList = data;
          this.active = this.typeaheadList[0];
          this.searching = false;
        }, error => {
          this.searching = false;
          this.error = error;
        });
      }
    },
    reset() {
      this.typeaheadList.splice(0, this.typeaheadList.length);
    },
    setModel(item) {
      this.model = item;
    },
    selectTypeahead() {
      this.setModel(this.active);
      this.reset()
    },
    setActive(direction, item) {
      this.active = item || this.active || this.typeaheadList[0];
      if (direction) {
        let index = this.typeaheadList.indexOf(this.active);
        this.active = this.typeaheadList[index + direction];
      }
    }
  }
}
</script>

<style>
.quick-wrapper {
  display: flex;
  justify-content: space-between;
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