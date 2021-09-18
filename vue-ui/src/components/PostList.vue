<template>
  <div>
    <h3>Список пользователей</h3>
    <post-item v-for="post in posts" :post="post" />
  </div>
</template>

<script>
import PostItem from '@/components/PostItem';

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
h3
	margin-top: 15px
</style>
