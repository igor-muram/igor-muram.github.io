<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <ui-button class="button">Удалить</ui-button>
    </div>
  </div>
</template>

<script>
import UIButton from '@/components/UI/UIButton';

export default {
  components: { UIButton },
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
</style>
