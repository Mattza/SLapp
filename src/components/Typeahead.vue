<template>
  <div>
    <input type="text" :value="model" autocomplete="off" @change="update" @keydown.down="down" @keydown.up="up" @keydown.enter="hit" @keydown.esc="reset" @blur="reset" @input="update" />
  
    <ul v-show="items.length">
      <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit(item)" @mousemove="setActive($item)">
        <span v-text="item[strKey]"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'typeahead',
  props: ['model', 'searchMethod', 'strKey', 'keyz'],
  data() {
    return {
      limit: 5,
      minChars: 3,
      selectFirst: false,
      items: [],

      active: undefined
    }
  },
  watch: {
    model: e => {
      console.log('watch', e, this)
    }
  },
  methods: {
    activeClass(item) {
      return item === this.active ? '--active' : '';
    },
    setActive(item) {
      this.active = item;
    },
    update(e) {
      console.log('update', e.target.value);
      this.$emit('changed', { val: e.target.value, key: this.keyz })
      this.searchMethod(this.model).then(data => {
        this.items = data;
      });
    },
    // The callback function which is triggered when the user hits on an item
    // (required)
    hit(e) {
      console.log('cahnged', e)
      this.$emit('changed', { val: e.Name, key: this.keyz })
    },

    // The callback function which is triggered when the response data are received
    // (optional)
    prepareResponseData(data) {
      // data = ...
      return data
    },
    reset() {
      this.items.length = 0;
      this.setActive(null);
    }
  }
}
</script>

<style>
li.active {
  /* ... */
}
</style>