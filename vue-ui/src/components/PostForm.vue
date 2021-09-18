<template>
  <form class="form" @submit.prevent>
    <h3>Создание поста</h3>
    <input v-model="post.title" class="input" type="text" placeholder="Название" />
    <input v-model="post.body" class="input" type="text" placeholder="Описание" />
    <ui-button class="button button--right" @click="createPost">Создать</ui-button>
  </form>
</template>

<script>
import UIButton from '@/components/UI/UIButton';

export default {
  components: {
    UIButton,
  },
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

.input
	width: 100%
	border: 1px solid teal
	padding: 10px 15px
	margin-bottom: 15px
</style>
