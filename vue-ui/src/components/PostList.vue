<template>
  <div class="post-list" v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red; margin-top: 15px">Список постов пуст</h2>
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
.post-list
	margin-top: 15px
	&-item
		display: inline-block
		margin-right: 10px
	&-enter-active, &-leave-active
		transition: all .4s ease
	&-enter-from, &-leave-to
		opacity: 0
		transform: translateX(130px)
	&-move
		transition: transform .4s ease
</style>
