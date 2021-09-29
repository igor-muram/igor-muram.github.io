<template>
  <div class="post">
    <div>
      <div>
        <strong>Пост № {{ post.id }}</strong>
      </div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <ui-button @click="$router.push(`/posts/${post.id}`)">Подробнее</ui-button>
      <ui-button @click="$emit('remove', post)">Удалить</ui-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.post
	padding: 15px
	border: 2px solid teal
	margin-top: 15px
	display: flex
	align-items: center
	justify-content: space-between
	&__buttons
    margin-left: 15px
    display: flex
</style>
