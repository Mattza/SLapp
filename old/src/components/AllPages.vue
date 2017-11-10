<template>
  <div>
    <searchform></searchform>
    <deviations></deviations>
    <mytrips></mytrips>
    <about></about>
  </div>
</template>
<script>
import searchform from './SearchForm'
import deviations from './Deviations'
import mytrips from './MyTrips'
import about from './About'

export default {
  name: 'allPages',
  components: {
    searchform,
    deviations,
    mytrips,
    about
  }
}
</script>

<style>

</style>