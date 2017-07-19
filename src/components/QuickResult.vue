<template>
  <div class="quick-wrapper">
    <button class="btn btn-default" type="button" @click="click(quick)" v-for="quick in filteredList">{{trimName(quick.Name)}}</button>
  </div>
</template>
<script>
export default {
  name: 'quick-result',
  props: ['list'],
  computed: {
    filteredList: function () {
      let nameArr = []
      return this.list
        .filter(listItem => {
          let trimedName = this.trimName(listItem.Name);
          console.log(nameArr)
          if (!nameArr.includes(trimedName)) {
            nameArr.push(trimedName)
            return true;
          }
          return false;
        })
        .sort((a, b) => a.date.length < b.date.length).slice(0, 6);
    }
  },
  methods: {
    click(item) {
      this.$emit('select', item);
    },
    trimName: function (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      name = name.split('(')[0]
      name = name.trim();
      return name;
    }
  }
}
</script>

<style>
.quick-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>