import { ref, onMounted } from 'vue';
import axios from 'axios';

export default function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostsLoaded = ref(false);

  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit,
        },
      });

      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (e) {
      alert('Во время загрузки постов произошла ошибка: ' + e);
    } finally {
      isPostsLoaded.value = true;
    }
  };

  onMounted(fetching);

  return {
    posts,
    totalPages,
    isPostsLoaded,
  };
}
