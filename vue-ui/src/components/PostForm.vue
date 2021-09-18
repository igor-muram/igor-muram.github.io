<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input v-model="post.title" class="input" type="text" placeholder="Название" />
    <input v-model="post.body" class="input" type="text" placeholder="Описание" />
    <button class="button" @click="createPost">Создать</button>
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
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
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
