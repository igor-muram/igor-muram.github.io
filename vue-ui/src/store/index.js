import { createStore } from 'vuex';
import { postModule } from '@/store/postModule';

export default createStore({
  modules: {
    post: postModule,
  },
});
