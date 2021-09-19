<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <ui-button @click="showDialog">Создать пост</ui-button>
    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>
    <post-list @remove="removePost" :posts="posts" v-if="isPostsLoaded" />
    <div class="loader" v-else>Идет загрузка постов...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import axios from 'axios';

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoaded: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (e) {
        alert('Произошла ошибка: ' + e);
      } finally {
        this.isPostsLoaded = true;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
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

h1
	margin-bottom: 20px

.loader
	margin-top: 15px
	font-size: 19px
</style>
