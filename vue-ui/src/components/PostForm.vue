<template>
  <form class="form" @submit.prevent>
    <h3>Создание поста</h3>
    <ui-input v-model="post.title" type="text" placeholder="Название" v-focus />
    <ui-input v-model="post.body" type="text" placeholder="Описание" />
    <ui-button class="button--right" @click="createPost">Создать</ui-button>
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

h3
	margin-bottom: 15px
</style>
