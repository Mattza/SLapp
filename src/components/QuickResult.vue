<template>
  <div class="quick-wrapper">
    <button class="btn btn-default" type="button" @click="click(quick)" v-for="quick in filteredList">{{quick.Name}}</button>
  </div>
</template>
<script>
export default {
  name: 'quick-result',
  props: ['list'],
  computed: {
    filteredList: function () {
      return this.list.sort((a, b) => a.count < b.count).slice(0, 3);
    }
  },
  methods: {
    click(item) {
      this.$emit('select', item);
    }
  }
}
</script>

<style>
.quick-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>