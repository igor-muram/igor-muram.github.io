<template>
  <div>
    <h1>Страница с постами</h1>

    <div class="app__inner">
      <ui-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        class="search-input"
      />

      <ui-button @click="showDialog">Создать пост</ui-button>

      <ui-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      ></ui-select>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoaded: (state) => state.post.isPostsLoaded,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  watch: {},
};
</script>

<style lang="sass">
.app__inner
  align-items: center
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
