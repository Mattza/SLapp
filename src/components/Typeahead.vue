<template>
  <div>
    <input type="text" v-model="model" autocomplete="off" @keydown.down="down" @keydown.up="up" @keydown.enter="hit" @keydown.esc="reset" @blur="reset" @input="update" />
  
    <ul v-show="items.length">
      <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
        <span v-text="item[strKey]"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'typeahead',
  props: ['model', 'searchMethod', 'strKey'],
  data() {
    return {
      // The source url
      // (required)
      src: '/api/typeahead',
      // The data that would be sent by request
      // (optional)
      data: {},

      // Limit the number of items which is shown at the list
      // (optional)
      limit: 5,

      // The minimum character length needed before triggering
      // (optional)
      minChars: 3,

      // Highlight the first item in the list
      // (optional)
      selectFirst: false,

      // Override the default value (`q`) of query parameter name
      // Use a falsy value for RESTful query
      // (optional)
      queryParamName: 'search',

      items: [],

      active: undefined
    }
  },

  methods: {
    activeClass(item) {
      return item === this.active ? '--active' : '';
    },
    setActive(item) {
      this.active = item;
    },
    update() {
      this.searchMethod(this.model).then(data => {
        this.items = data;
      });
    },
    // The callback function which is triggered when the user hits on an item
    // (required)
    hit(item) {
      this.model = item.Name
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