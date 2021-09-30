<template>
  <div>
    <h1>Страница с постами</h1>

    <div class="app__inner">
      <ui-input v-model="searchQuery" placeholder="Поиск..." class="search-input" />

      <ui-button @click="showDialog">Создать пост</ui-button>

      <ui-select v-model="selectedSort" :options="sortOptions"></ui-select>
    </div>

    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>

    <post-list @remove="removePost" :posts="sortedAndSearchedPosts" v-if="isPostsLoaded" />
    <div class="loader" v-else>Идет загрузка постов...</div>
    <div class="observer" v-intersection="loadMorePosts"></div>
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Во время загрузки постов произошла ошибка: ' + e);
      } finally {
        this.isPostsLoaded = true;
      }
    },
    async loadMorePosts() {
      try {
        this.page++;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Во время загрузки постов произошла ошибка: ' + e);
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
  watch: {},
};
</script>

<style lang="sass">
.app__inner
	background: #fff
	padding: 15px 0
	display: flex
	flex-wrap: wrap
	justify-content: space-between
	position: sticky
	top: 0

h1
	margin-bottom: 20px

.loader
	margin-top: 15px
	font-size: 19px

.page
	border: 1px solid teal
	padding: 10px
	user-select: none
	cursor: pointer
	transition: all .3s ease
	color: teal
	& + .page
		margin-left: 10px
	&.active, &:active, &:hover
		color: #fff
	&.active
		background: teal
	&:hover
		background: lighten(teal, 5%)
	&:active
		background: lighten(teal, 10%)
	&__wrapper
		display: flex
		justify-content: center
		margin: 0 15px

.search-input
	width: 100%
</style>
