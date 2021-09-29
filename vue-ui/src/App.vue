<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
  components: { Navbar },
};
</script>

<style lang="sass">
*,
*::before,
*::after
	margin: 0
	padding: 0
	box-sizing: border-box

.app
	padding: 20px
</style>
