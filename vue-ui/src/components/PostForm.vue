<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input
      class="input"
      :value="post.title"
      @input="post.title = $event.target.value"
      type="text"
      placeholder="Название"
    />
    <input
      class="input"
      :value="post.body"
      @input="post.body = $event.target.value"
      type="text"
      placeholder="Описание"
    />
    <button class="button">Создать</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.form
	display: flex
	flex-direction: column

.input
	width: 100%
	border: 1px solid teal
	padding: 10px 15px
	margin-top: 15px

.button
	margin-top: 15px
	margin-bottom: 15px
	padding: 10px 15px
	background: none
	border: 1px solid teal
	color: teal
	cursor: pointer
</style>
