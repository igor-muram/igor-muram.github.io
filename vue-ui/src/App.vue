<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <ui-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__buttons">
      <ui-button @click="showDialog">Создать пост</ui-button>
      <ui-select v-model="selectedSort" :options="sortOptions"></ui-select>
    </div>
    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>
    <post-list @remove="removePost" :posts="sortedAndSearchedPosts" v-if="isPostsLoaded" />
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
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        { value: 'title', name: 'по названию' },
        { value: 'body', name: 'по содержимому' },
      ],
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
        alert('Во время загрузки постов произошла ошибка: ' + e);
      } finally {
        this.isPostsLoaded = true;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
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
	&__buttons
		display: flex
		justify-content: space-between

h1
	margin-bottom: 20px

.loader
	margin-top: 15px
	font-size: 19px
</style>
