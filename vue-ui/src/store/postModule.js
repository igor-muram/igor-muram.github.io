import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]),
      );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoaded = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });

        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (e) {
        alert('Во время загрузки постов произошла ошибка: ' + e);
      } finally {
        commit('setLoading', true);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });

        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        alert('Во время загрузки постов произошла ошибка: ' + e);
      }
    },
  },
  namespaced: true,
};
